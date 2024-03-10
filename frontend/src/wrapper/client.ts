import {ApolloClient, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';

const LOCAL_SYSTEM_IP_ADDRESS = 'Add your local IP Address';
const PORT = '4000';

const httpLink = createHttpLink({
  uri: `http://${LOCAL_SYSTEM_IP_ADDRESS}:${PORT}/graphql`,
});

const authLink = setContext((_, {headers}) => {
  // Get the authentication token from wherever you have stored it
  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJxYThLTEw2SWFZR2swdXl4ajRSck9PX2VrSG5rSTlhNHlBdUNlanlZUW9ZIn0.eyJleHAiOjE3MTAxMDAxNDQsImlhdCI6MTcxMDA5ODM0NCwianRpIjoiY2EyNmQxYTUtMzg1Mi00NWIwLWI2MWEtODRkNzhiYWNjZTViIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9JbmZpbml0eUxhdW5kcnkiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODZjNWM3MjctNmZkOS00ZDc1LWFhNzMtMzU1MjhhZTZlNjFhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5maW5pdHktbGF1bmRyeS1wdWJsaWMiLCJzZXNzaW9uX3N0YXRlIjoiYTFlYTI5ZGEtNWQxMS00NWRmLWIzNTItNDUwODU3ZWRlNjZjIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWluZmluaXR5bGF1bmRyeSIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6ImExZWEyOWRhLTVkMTEtNDVkZi1iMzUyLTQ1MDg1N2VkZTY2YyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ik5pdGVzaCBLdW1hciIsInByZWZlcnJlZF91c2VybmFtZSI6Im5pdGVzaDEiLCJnaXZlbl9uYW1lIjoiTml0ZXNoIiwiZmFtaWx5X25hbWUiOiJLdW1hciIsImVtYWlsIjoibml0ZXNoMTEwODk3QGdtYWlsLmNvbSJ9.hdCErYHEBNtPBSM02GtgNnsuKBC1fDE87jrD7vNN9TVL0zRE5P6axZi5XWRXmF3NRrw8mYkfqIHRuxi2Ocal-bAYT-giH-oNJzbtp2leaDzrAB9lKUOmVzWzolmEXTa13TffDHceyau5AQslgcP6jf3zzVHcXi29S5dQaRGPV9D4KlinhX-UFtiDXKTe7qTLiX7JTmPgn6bv1--yGm5mPzcOgM1eJAy9Bbiv3WYitPnRMWYZDDPni65AB2PwZ2kacLrFsZy6bqsw5j0JLAkOmAXNt4rnt66GsGzH3WhUs4sMhw-mTlsBOTyICZOINBDqn9BoXhJhfU6gFcFPxVO17w';

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
} as any);
