import {ApolloClient, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {NativeModules} from 'react-native';

const {SecureStorageModule} = NativeModules;

const LOCAL_SYSTEM_IP_ADDRESS = '192.168.1.8';

const httpLink = createHttpLink({
  uri: `http://${LOCAL_SYSTEM_IP_ADDRESS}:4000/graphql`
});

const authLink = setContext(async () => {
  const accessToken = await SecureStorageModule.getValue('access-token');
  const tokenType = await SecureStorageModule.getValue('token-type');

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
