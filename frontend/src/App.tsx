import 'react-native-gesture-handler';
import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {client} from './apolloClient';
import {MeContextProvider} from '~/me';
import {Navigation} from './Navigation';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <MeContextProvider>
        <Navigation />
      </MeContextProvider>
    </ApolloProvider>
  );
};

export default App;
