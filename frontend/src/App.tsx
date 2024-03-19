import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloProvider} from '@apollo/client';
import {client} from '../src/wrapper/client';
import {useStackScreen} from './hooks';
import {MeContextProvider} from './wrapper/Me';
import {NativeModules} from 'react-native';

const {SecureStorageModule} = NativeModules;

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const screens = useStackScreen();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await SecureStorageModule.getValue('access-token');
      setIsLoggedIn(!!accessToken);
    };
    checkLoginStatus();
  }, []);

  return (
    <ApolloProvider client={client}>
      <MeContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={!isLoggedIn ? 'LoginPage' : 'MainPage'}>
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
      </MeContextProvider>
    </ApolloProvider>
  );
};

export default App;
