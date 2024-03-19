import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useMeContext} from '~/modules/me';
import LoginPage from '~/modules/screens/components/Login/LoginPage';
import {ForgotPasswordPage} from '~/modules/screens/components/ForgotPassword';
import {
  PersonalDetails,
  PhoneVerification,
  ResetPassword
} from '~/modules/screens/components/SignUp';
import {MainPage} from '~/modules/screens';

interface StachScreen {
  id: number;
  name: string;
  component: React.FC<any>;
  options: any;
}

export const stackScreens: StachScreen[] = [
  {
    id: 1,
    name: 'LoginPage',
    component: LoginPage,
    options: {
      headerShown: false
    }
  },
  {
    id: 2,
    name: 'ForgotPasswordPage',
    component: ForgotPasswordPage,
    options: {
      headerShown: false
    }
  },
  {
    id: 3,
    name: 'PersonalDetails',
    component: PersonalDetails,
    options: {
      headerShown: false
    }
  },
  {
    id: 4,
    name: 'PhoneVerification',
    component: PhoneVerification,
    options: {
      headerShown: false
    }
  },
  {
    id: 5,
    name: 'ResetPassword',
    component: ResetPassword,
    options: {
      headerShown: false
    }
  },
  {
    id: 6,
    name: 'MainPage',
    component: MainPage,
    options: {
      headerShown: false
    }
  }
];

const Stack = createNativeStackNavigator();

export const Navigation: React.FC = () => {
  const {me} = useMeContext();

  const initialRouteName = me && me.id ? 'LoginPage' : 'MainPage';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {stackScreens.map(screen => (
          <Stack.Screen
            key={screen.id}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
