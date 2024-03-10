import React from 'react';
import LoginScreen from '../src/modules/screens/LoginScreen';
import HomeScreen from '../src/modules/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../src/modules/screens/SignUpScreen';
import {ApolloProvider} from '@apollo/client';
import {client} from '../src/wrapper/client';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Log In" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen name="Home Page" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
