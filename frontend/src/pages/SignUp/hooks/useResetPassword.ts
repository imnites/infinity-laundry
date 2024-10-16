import {useCallback, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useUpdatePassword} from '~/hooks';
import {useNavigation} from '@react-navigation/native';

const useResetPassword = (route: any) => {
  const navigation = useNavigation();

  const {updatePassword} = useUpdatePassword();

  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
    isSubmitting: false
  });

  const handlePasswordChange = (text: string) => {
    setFormValues(prevDetails => ({...prevDetails, password: text}));
  };

  const handleConfirmPasswordChange = (text: string) => {
    setFormValues(prevDetails => ({...prevDetails, confirmPassword: text}));
  };

  const handleSubmit = async () => {
    if (formValues.password !== formValues.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password do not match',
        position: 'bottom'
      });
      return;
    }

    setFormValues(prevDetails => ({...prevDetails, isSubmitting: true}));
    try {
      const isPasswordUpdated = await updatePassword({
        password: formValues.password
      });

      setFormValues(prevDetails => ({...prevDetails, isSubmitting: false}));
      if (isPasswordUpdated) {
        if (route.params.parent === 'SignUp') {
          Toast.show({
            type: 'success',
            text1: 'Your account has been successfully created',
            position: 'bottom'
          });
          (navigation.navigate as any)('LoginPage');
        } else {
          Toast.show({
            type: 'success',
            text1: 'Password successful updated',
            position: 'bottom'
          });
          (navigation.navigate as any)('LoginPage');
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom'
      });
    }
  };

  const handleBackButton = useCallback(
    () => (navigation.navigate as any)('LoginPage'),
    [navigation.navigate]
  );

  return {
    formValues,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    handleBackButton
  };
};

export default useResetPassword;
