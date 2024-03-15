import React from 'react';
import LoginPage from './modules/screens/LoginPage';
import HomeScreen from '../src/modules/screens/HomeScreen';
import {
  SignUpPage1,
  SignUpPage2,
  SignUpPage3,
} from '../src/modules/screens/components/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloProvider} from '@apollo/client';
import {client} from '../src/wrapper/client';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SignUpPage1" component={SignUpPage1} />
          <Stack.Screen name="SignUpPage2" component={SignUpPage2} />
          <Stack.Screen name="SignUpPage3" component={SignUpPage3} />
          <Stack.Screen name="Home Page" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
