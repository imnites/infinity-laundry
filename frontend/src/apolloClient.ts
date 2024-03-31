import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable
} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {
  getTokenValue,
  deleteTokenValue,
  setTokenValue
} from '~/utils/token-utils';
import {onError} from '@apollo/client/link/error';
import {RetryLink} from '@apollo/client/link/retry';
import {NativeModules} from 'react-native';
import {isAndroid} from '~/utils';

const {AppControllerModule} = NativeModules;

const refreshTokenErrorCode = {
  EXPIRED: 'REFRESH_TOKEN_EXPIRED',
  NOT_EXISTS: 'REFRESH_TOKEN_NOT_EXISTS'
};

const LOCAL_SYSTEM_IP_ADDRESS = '192.168.1.9';

const url = `http://${LOCAL_SYSTEM_IP_ADDRESS}:4000/graphql`;

const httpLink = createHttpLink({
  uri: url
});

const getNewToken = async () => {
  const {refreshToken} = await getTokenValue();
  if (!refreshToken) {
    return Promise.reject({code: refreshTokenErrorCode.NOT_EXISTS});
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        mutation refreshToken($refreshToken: String!) {
          refreshToken(refreshToken: $refreshToken) {
            accessToken
            refreshToken
            tokenType
          }
        }
      `,
      variables: {
        refreshToken: refreshToken
      }
    })
  })
    .then(response => {
      return response.json();
    })
    .then(({data}) => {
      if (data) {
        return data;
      }

      throw {code: refreshTokenErrorCode.EXPIRED};
    });
};

const errorLink = onError(({graphQLErrors, operation, forward}) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'Unauthorized':
          return new Observable(observer => {
            getNewToken()
              .then(({refreshToken: token}) => {
                setTokenValue({
                  accessToken: token.accessToken,
                  refreshToken: token.refreshToken,
                  tokenType: token.tokenType
                });
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `${token.tokenType} ${token.accessToken}`
                  }
                });
              })
              .then(() => {
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                };

                forward(operation).subscribe(subscriber);
              })
              .catch(({code}) => {
                if (code === refreshTokenErrorCode.EXPIRED) {
                  deleteTokenValue();
                  setTimeout(() => {
                    isAndroid &&
                      AppControllerModule &&
                      AppControllerModule.restart();
                  }, 5000);
                } else {
                  observer.error(code);
                }
              });
          });
      }
    }
  }
});

const authLink = setContext(async () => {
  const {accessToken, tokenType} = await getTokenValue();

  return {
    headers: {
      authorization: accessToken ? `${tokenType} ${accessToken}` : ''
    }
  };
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 20000,
    jitter: true
  },
  attempts: {
    max: 3,
    retryIf: error => !!error
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    retryLink,
    authLink as unknown as ApolloLink,
    httpLink as unknown as ApolloLink
  ]),
  cache: new InMemoryCache()
} as any);
