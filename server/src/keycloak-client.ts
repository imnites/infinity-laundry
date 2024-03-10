import querystring from 'querystring';
import axios from 'axios';
import {
  keycloakClientId,
  keycloakClientSecret,
  keycloakREALM,
  keycloakRootUrl
} from './config';
import { GraphQLError } from 'graphql';

const mapToTokenDetails = (data: {
  [key: string]: unknown;
}): {
  accessToken: string;
  expiresInSec: number;
} => ({
  accessToken: data.access_token as string,
  expiresInSec: data.expires_in as number
});

export class KeycloakClient {
  private readonly _rootUrl: string;

  private readonly _realm: string;

  private readonly _clientId: string;

  private readonly _clientSecret: string;

  public constructor() {
    this._rootUrl = keycloakRootUrl;
    this._realm = keycloakREALM;
    this._clientId = keycloakClientId;
    this._clientSecret = keycloakClientSecret;
  }

  public async requestToken(): Promise<{
    accessToken: string;
    expiresInSec: number;
  }> {
    const url = `${this._rootUrl}/realms/${this._realm}/protocol/openid-connect/token`;
    return axios
      .post(
        url,
        querystring.stringify({
          grant_type: 'client_credentials',
          client_id: this._clientId,
          client_secret: this._clientSecret
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

  public async introspectToken(
    token: string
  ): Promise<{ [key: string]: unknown }> {
    const url = `${this._rootUrl}/realms/${this._realm}/protocol/openid-connect/token/introspect`;

    return axios
      .post(
        url,
        querystring.stringify({
          token: token,
          client_id: this._clientId,
          client_secret: this._clientSecret
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
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

  public async revoke(token: string): Promise<{ [key: string]: unknown }> {
    const url = `${this._rootUrl}/realms/${this._realm}/protocol/openid-connect/revoke`;

    return axios
      .post(
        url,
        querystring.stringify({
          client_id: this._clientId,
          client_secret: this._clientSecret,
          token: token,
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

  public async post({
    methodName,
    queryParam,
    input
  }: {
    methodName: string;
    queryParam?: string;
    input: { [key: string]: unknown };
  }): Promise<{
    [key: string]: unknown;
  }> {
    const url =
      queryParam !== undefined
        ? `${this._rootUrl}/admin/realms/${this._realm}/${methodName}/${queryParam}`
        : `${this._rootUrl}/admin/realms/${this._realm}/${methodName}`;
    const { accessToken } = await this.requestToken();

    return axios
      .post(url, input, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
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
}
