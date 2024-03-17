import querystring from 'querystring';
import axios from 'axios';
import {
  keycloakPublicClientId,
  keycloakREALM,
  keycloakRootUrl
} from './config';
import { GraphQLError } from 'graphql';
import { RedisClient } from './redis-client';

const mapToTokenDetails = (data: {
  [key: string]: unknown;
}): {
  accessToken: string;
  expiresInSec: number;
  refreshToken: string;
  refreshTokenExpiresInSec: number;
  tokenType: string;
  sessionState: string;
  scope: string;
} => ({
  accessToken: data.access_token as string,
  expiresInSec: data.expires_in as number,
  refreshToken: data.refresh_token as string,
  refreshTokenExpiresInSec: data.refresh_expires_in as number,
  tokenType: data.token_type as string,
  sessionState: data.session_state as string,
  scope: data.scope as string
});

export class KeycloakPublicClient {
  private readonly _rootUrl: string;

  private readonly _realm: string;

  private readonly _clientId: string;

  private _authorization: string;

  private readonly _redisClient: RedisClient;

  public constructor(
    authorization: string | undefined,
    redisClient: RedisClient
  ) {
    this._rootUrl = keycloakRootUrl;
    this._realm = keycloakREALM;
    this._clientId = keycloakPublicClientId;
    this._authorization = authorization ?? '';
    this._redisClient = redisClient;
  }

  public get tokenType(): string {
    if (this._authorization.startsWith('Bearer ')) {
      return 'Bearer';
    }

    if (this._authorization.startsWith('Basic ')) {
      return 'Basic';
    }

    return '';
  }

  public get accessToken(): string {
    if (this._authorization.startsWith('Bearer ')) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      return this._authorization.substring(7);
    }

    if (this._authorization.startsWith('Basic ')) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      return this._authorization.substring(6);
    }

    return this._authorization;
  }

  public set authorization(authorization: string) {
    this._authorization = authorization;
  }

  public async requestToken({
    username,
    password
  }: {
    username: string;
    password: string;
  }): Promise<{
    accessToken: string;
    expiresInSec: number;
    refreshToken: string;
    refreshTokenExpiresInSec: number;
    tokenType: string;
    sessionState: string;
    scope: string;
  }> {
    const url = `${this._rootUrl}/realms/${this._realm}/protocol/openid-connect/token`;
    return axios
      .post(
        url,
        querystring.stringify({
          grant_type: 'password',
          client_id: this._clientId,
          scope: 'openid',
          username,
          password
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(({ data }: { data: { [key: string]: unknown } }) => {
        return mapToTokenDetails(data);
      })
      .catch(
        ({
          response
        }: {
          response: { data: { error: string; error_description: string } };
        }) => {
          throw new GraphQLError(response.data.error, {
            extensions: { description: response.data.error_description }
          });
        }
      );
  }

  public async getMe(): Promise<{ [key: string]: unknown }> {
    if (this.tokenType === 'Bearer') {
      const url = `${this._rootUrl}/realms/${this._realm}/protocol/openid-connect/userinfo`;

      return axios
        .get(url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: this._authorization
          }
        })
        .then(({ data }: { data: { [key: string]: unknown } }) => data)
        .catch(
          ({
            response
          }: {
            response: { data: { error: string; error_description: string } };
          }) => {
            throw new GraphQLError(response.data.error, {
              extensions: { description: response.data.error_description }
            });
          }
        );
    }

    if (this.tokenType === 'Basic') {
      const user = await this._redisClient.retrieveData<{
        userId: string;
        allowedAction: string[];
      }>(this.accessToken);

      if (user !== null) {
        return {
          id: user.userId,
          allowedAction: user.allowedAction
        };
      }
    }

    throw new GraphQLError('unauthorized');
  }

  public async updateUserForAccessToken(
    userId: string,
    expiresInSec: number
  ): Promise<void> {
    if (this.tokenType === 'Basic') {
      const user = await this._redisClient.retrieveData<{
        userId: string;
        allowedAction: string[];
      }>(this.accessToken);

      await this._redisClient.saveData(
        this.accessToken,
        {
          ...user,
          userId
        },
        expiresInSec
      );
    }
  }

  public async revokeAccessToken(): Promise<{ [key: string]: unknown }> {
    const url = `${this._rootUrl}/realms/${this._realm}/protocol/openid-connect/revoke`;

    return axios
      .post(
        url,
        querystring.stringify({
          client_id: this._clientId,
          token: this.accessToken,
          token_type_hint: 'access_token'
        })
      )
      .then(({ data }: { data: { [key: string]: unknown } }) => data)
      .catch(
        ({
          response
        }: {
          response: { data: { error: string; error_description: string } };
        }) => {
          throw new GraphQLError(response.data.error, {
            extensions: { description: response.data.error_description }
          });
        }
      );
  }

  public async revokeRefreshToken(
    refreshToken: string
  ): Promise<{ [key: string]: unknown }> {
    const url = `${this._rootUrl}/realms/${this._realm}/protocol/openid-connect/revoke`;

    return axios
      .post(
        url,
        querystring.stringify({
          client_id: this._clientId,
          token: refreshToken,
          token_type_hint: 'access_token'
        })
      )
      .then(({ data }: { data: { [key: string]: unknown } }) => data)
      .catch(
        ({
          response
        }: {
          response: { data: { error: string; error_description: string } };
        }) => {
          throw new GraphQLError(response.data.error, {
            extensions: { description: response.data.error_description }
          });
        }
      );
  }

  public async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    expiresInSec: number;
    refreshToken: string;
    refreshTokenExpiresInSec: number;
    tokenType: string;
    sessionState: string;
    scope: string;
  }> {
    const url = `${this._rootUrl}/realms/${this._realm}/protocol/openid-connect/token`;

    return axios
      .post(
        url,
        querystring.stringify({
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
          client_id: this._clientId
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(({ data }: { data: { [key: string]: unknown } }) => {
        return mapToTokenDetails(data);
      })
      .catch(
        ({
          response
        }: {
          response: { data: { error: string; error_description: string } };
        }) => {
          throw new GraphQLError(response.data.error, {
            extensions: { description: response.data.error_description }
          });
        }
      );
  }
}
