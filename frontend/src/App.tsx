import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloProvider} from '@apollo/client';
import {client} from '../src/wrapper/client';
import {useStackScreen} from './hooks';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const screens = useStackScreen();
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
          {screens.map(screen => (
            <Stack.Screen
              key={screen.id}
              name={screen.name}
              component={screen.component}
              options={screen.options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
