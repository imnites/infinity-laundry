import LoginPage from '../modules/screens/components/Login/LoginPage';
import {ForgotPasswordPage} from '../modules/screens/components/ForgotPassword';
import {
  PersonalDetails,
  PhoneVerification,
  ResetPassword,
} from '../modules/screens/components/SignUp';
import {MainPage} from '../modules/screens';

interface StachScreenReturnType {
  id: number;
  name: string;
  component: any;
  options: any;
}

const useStackScreen = (): StachScreenReturnType[] => {
  return [
    {
      id: 1,
      name: 'LoginPage',
      component: LoginPage,
      options: {
        headerShown: false,
      },
    },
    {
      id: 2,
      name: 'ForgotPasswordPage',
      component: ForgotPasswordPage,
      options: {
        headerShown: false,
      },
    },
    {
      id: 3,
      name: 'PersonalDetails',
      component: PersonalDetails,
      options: {
        headerShown: false,
      },
    },
    {
      id: 4,
      name: 'PhoneVerification',
      component: PhoneVerification,
      options: {
        headerShown: false,
      },
    },
    {
      id: 5,
      name: 'ResetPassword',
      component: ResetPassword,
      options: {
        headerShown: false,
      },
    },
    {
      id: 6,
      name: 'MainPage',
      component: MainPage,
      options: {
        headerShown: false,
      },
    },
  ];
};

export default useStackScreen;
