import {useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useMeContext} from '~/me';
import {isValidEmail, isValidPhoneNumber} from '~/utils';

interface LoginHandlerPropsType {
  authenticateUser: any;
}

interface LoginType {
  userName: string;
  password: string;
}

export const mapToLoginInput = ({userName, password}: LoginType) => {
  if (isValidPhoneNumber(userName)) {
    const phone = userName.replace(/\s/g, '');

    const len = phone.length;

    return {
      phoneNumber: {
        countryCode: phone.substring(0, len - 10) || '+91',
        phoneNumber: phone.substring(len - 10)
      },
      password: password
    };
  }
  return {userName: userName, password: password};
};

const useLoginHandlers = ({authenticateUser}: LoginHandlerPropsType) => {
  const navigation = useNavigation();
  const {setMe} = useMeContext();
  const [credential, setCredential] = useState<{
    userName: string;
    password: string;
  }>({
    userName: '',
    password: ''
  });

  const onUserNameChange = useCallback(
    (text: string) =>
      setCredential({
        ...credential,
        userName: text
      }),
    [credential, setCredential]
  );

  const onPasswordChange = useCallback(
    (text: string) =>
      setCredential({
        ...credential,
        password: text
      }),
    [credential, setCredential]
  );

  const onReset = useCallback(
    () => setCredential({userName: '', password: ''}),
    [setCredential]
  );

  const onSubmit = useCallback(async () => {
    if (!credential.userName || !credential.password) {
      Toast.show({
        type: 'error',
        text1: 'Please enter credentials!',
        position: 'bottom'
      });
      return;
    }

    if (!isValidEmail && !isValidPhoneNumber(credential.userName)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email or phone number',
        position: 'bottom'
      });
      return;
    }

    const result = await authenticateUser(mapToLoginInput(credential));

    if (result.error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Credential',
        position: 'bottom'
      });
      onReset();
    } else {
      setMe && setMe(result.me);
      (navigation.navigate as any)('MainPage');

      setCredential({userName: '', password: ''});
    }
  }, [authenticateUser, credential, navigation, onReset, setMe]);

  const onSignUp = useCallback(
    () => (navigation.navigate as any)('PersonalDetails'),
    [navigation]
  );

  const handleForgotPassword = useCallback(() => {
    (navigation.navigate as any)('ForgotPasswordPage');
  }, [navigation.navigate]);

  return {
    credential,
    onUserNameChange,
    onPasswordChange,
    onSubmit,
    onSignUp,
    handleForgotPassword
  };
};

export default useLoginHandlers;
