import querystring from 'querystring';
import axios from 'axios';
import {
  keycloakPublicClientId,
  keycloakREALM,
  keycloakRootUrl
} from './config';
import { GraphQLError } from 'graphql';

const mapToTokenDetails = (data: {
  [key: string]: unknown;
}): {
  accessToken: string;
  expiresInMS: number;
  refreshToken: string;
  refreshTokenExpiresInMS: number;
  tokenType: string;
  sessionState: string;
  scope: string;
} => ({
  accessToken: data.access_token as string,
  expiresInMS: data.expires_in as number,
  refreshToken: data.refresh_token as string,
  refreshTokenExpiresInMS: data.refresh_expires_in as number,
  tokenType: data.token_type as string,
  sessionState: data.session_state as string,
  scope: data.scope as string
});

export class KeycloakPublicClient {
  private readonly _rootUrl: string;

  private readonly _realm: string;

  private readonly _clientId: string;

  public constructor() {
    this._rootUrl = keycloakRootUrl;
    this._realm = keycloakREALM;
    this._clientId = keycloakPublicClientId;
  }

  public async requestToken({
    username,
    password
  }: {
    username: string;
    password: string;
  }): Promise<{
    accessToken: string;
    expiresInMS: number;
    refreshToken: string;
    refreshTokenExpiresInMS: number;
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

  public async refreshToken({
    refreshToken
  }: {
    refreshToken: string;
  }): Promise<{
    accessToken: string;
    expiresInMS: number;
    refreshToken: string;
    refreshTokenExpiresInMS: number;
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
            'Content-Type': 'x-www-form-urlencoded'
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
