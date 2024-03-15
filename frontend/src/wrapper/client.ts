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
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJxYThLTEw2SWFZR2swdXl4ajRSck9PX2VrSG5rSTlhNHlBdUNlanlZUW9ZIn0.eyJleHAiOjE3MTA1MzcyMTAsImlhdCI6MTcxMDUzNTQxMCwianRpIjoiNTkyNDkxOWUtM2ZhNi00OGUyLTllYjgtZmU2YWViMDM3YjUwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9JbmZpbml0eUxhdW5kcnkiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODZjNWM3MjctNmZkOS00ZDc1LWFhNzMtMzU1MjhhZTZlNjFhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaW5maW5pdHktbGF1bmRyeS1wdWJsaWMiLCJzZXNzaW9uX3N0YXRlIjoiN2Q3ZWZiMTQtZTFkZC00MmM1LTk0NzktODkyYTkyZjYzMGRlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWluZmluaXR5bGF1bmRyeSIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjdkN2VmYjE0LWUxZGQtNDJjNS05NDc5LTg5MmE5MmY2MzBkZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Ik5pdGVzaCBLdW1hciIsInByZWZlcnJlZF91c2VybmFtZSI6Im5pdGVzaDEiLCJnaXZlbl9uYW1lIjoiTml0ZXNoIiwiZmFtaWx5X25hbWUiOiJLdW1hciIsImVtYWlsIjoibml0ZXNoMTEwODk3QGdtYWlsLmNvbSJ9.1Jx1eSFqOB5X36h1prdPlVQHcvqqxi6_bqsaPngLQnsdTJ42xGGatmWKSp4q59TXu5K8R8HZu9e5jEacRdpvNsSwB6UTCMGG7roN1o7RoglWFN1Xx52hwLV1dIDz1UGX2Vl4DSgHupAJxZKb1cdx8u9rCK0Lj5VAHD5e_ruMh3aUJ18E4Ugspy_Zkcbx0TaDQ-I2OHnOlPQh6ZOYqUocsmX5Bum_9D-Il3EVisFs3JnorFG7vvJ-whBzbtsAHBm6ksPdiV7CFBYhphLBe3Ifej37EdVAjDA6PpK1RiI4vkXmHC_kwJBj0yXL20SBt4o_ep_w4ndge1WWlFwAxPxJ4g';

  // Return the headers to the context so httpLink can read them
  return {
    headers: headers
      ? {
          ...headers,
        }
      : {
          authorization: token ? `Bearer ${token}` : '',
        },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
} as any);
