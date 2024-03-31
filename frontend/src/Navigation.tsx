import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useMeContext} from '~/me';
import {LoginPage} from '~/pages/Login';
import {ForgotPasswordPage} from '~/pages/ForgotPassword';
import {ProfileDetailsPage} from '~/pages/ProfileDetails';
import {
  PersonalDetails,
  PhoneVerification,
  ResetPassword
} from '~/pages/SignUp';
import {MainPage} from '~/pages/MainPage';
import PaymentPage from './pages/Payment/PaymentPage';
import {TermsAndConditions} from './components/sidepanel/additional-options/components';
import {ContactUs} from './components/sidepanel/get-in-touch-section/components';
import {Faqs} from './components/sidepanel/help-section/components';
import {PreviewOrder} from '~/pages/PreviewOrder';

interface StackScreen {
  id: number;
  name: string;
  component: React.FC<any>;
  options: any;
}

export const stackScreens: StackScreen[] = [
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
  },
  {
    id: 7,
    name: 'ProfileDetailsPage',
    component: ProfileDetailsPage,
    options: {
      headerShown: false
    }
  },
  {
    id: 8,
    name: 'PaymentPage',
    component: PaymentPage,
    options: {
      headerShown: false
    }
  },
  {
    id: 9,
    name: 'Faqs',
    component: Faqs,
    options: {
      headerShown: false
    }
  },
  {
    id: 10,
    name: 'ContactUs',
    component: ContactUs,
    options: {
      headerShown: false
    }
  },
  {
    id: 11,
    name: 'TermsAndConditions',
    component: TermsAndConditions,
    options: {
      headerShown: false
    }
  },
  {
    id: 12,
    name: 'PreviewOrder',
    component: PreviewOrder,
    options: {
      headerShown: false
    }
  }
];

const Stack = createNativeStackNavigator();

export const Navigation: React.FC = () => {
  const {me} = useMeContext();

  const initialRouteName = me && me.id ? 'MainPage' : 'LoginPage';

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
