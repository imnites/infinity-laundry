import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  fromPromise
} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {getTokenValue, deleteTokenValue} from '~/utils/token-utils';
import {onError} from '@apollo/client/link/error';
import {RetryLink} from '@apollo/client/link/retry';
import {NativeModules} from 'react-native';
import {isAndroid} from '~/utils';

const {AppControllerModule} = NativeModules;

const LOCAL_SYSTEM_IP_ADDRESS = '192.168.1.8';

const url = `http://${LOCAL_SYSTEM_IP_ADDRESS}:4000/graphql`;

const httpLink = createHttpLink({
  uri: url
});

const getNewToken = async (refreshToken: string) => {
  if (!refreshToken) {
    return Promise.resolve();
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

      throw new Error('Refresh token expired');
    });
};

const errorLink = onError(({graphQLErrors, operation, forward}) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'Unauthorized':
          fromPromise(
            getTokenValue().then(({refreshToken}) =>
              getNewToken(refreshToken).catch(async () => {
                const deleted = await deleteTokenValue();
                if (deleted) {
                  setTimeout(() => {
                    isAndroid &&
                      AppControllerModule &&
                      AppControllerModule.restart();
                  }, 5000);
                }
                return;
              })
            )
          )
            .filter(value => Boolean(value))
            .flatMap(accessToken => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`
                }
              });

              // retry the request, returning the new observable
              return forward(operation);
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
