import {ApolloClient, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {getTokenValue} from '~/utils/token-utils';

const LOCAL_SYSTEM_IP_ADDRESS = '192.168.1.8';

const httpLink = createHttpLink({
  uri: `http://${LOCAL_SYSTEM_IP_ADDRESS}:4000/graphql`
});

const authLink = setContext(async () => {
  const {accessToken, tokenType} = await getTokenValue();

  return {
    headers: {
      authorization: accessToken ? `${tokenType} ${accessToken}` : ''
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
} as any);
