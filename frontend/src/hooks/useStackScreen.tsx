import LoginPage from '../modules/screens/components/Login/LoginPage';
import {ForgotPasswordPage} from '../modules/screens/components/ForgotPassword';
import {
  SignUpPage1,
  SignUpPage2,
  SignUpPage3,
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
      name: 'SignUpPage1',
      component: SignUpPage1,
      options: {
        headerShown: false,
      },
    },
    {
      id: 4,
      name: 'SignUpPage2',
      component: SignUpPage2,
      options: {
        headerShown: false,
      },
    },
    {
      id: 5,
      name: 'SignUpPage3',
      component: SignUpPage3,
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
