import {useState} from 'react';
import {useUpdatePassword} from '~/modules/common/hooks';
import {Alert} from 'react-native';

interface ResetPasswordPropsType {
  navigation: any;
  route: any;
}

const useResetPassword = ({navigation, route}: ResetPasswordPropsType) => {
  const {accessToken} = route.params;
  const {updatePassword} = useUpdatePassword();

  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
    strength: '',
    isSubmitting: false
  });

  const calculateStrength = (text: string) => {
    const length = text.length;
    if (length < 8) {
      setFormValues(prevDetails => ({...prevDetails, strength: 'Weak'}));
    } else if (length < 12) {
      setFormValues(prevDetails => ({...prevDetails, strength: 'Medium'}));
    } else {
      setFormValues(prevDetails => ({...prevDetails, strength: 'Strong'}));
    }
  };

  const handlePasswordChange = (text: string) => {
    setFormValues(prevDetails => ({...prevDetails, password: text}));
    calculateStrength(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setFormValues(prevDetails => ({...prevDetails, confirmPassword: text}));
  };

  const handleSubmit = async () => {
    if (formValues.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setFormValues(prevDetails => ({...prevDetails, isSubmitting: true}));
    try {
      const headers = {authorization: `Basic ${accessToken}`};
      const isPasswordUpdated = await updatePassword(
        {
          password: formValues.password
        },
        headers
      );

      setFormValues(prevDetails => ({...prevDetails, isSubmitting: false}));
      if (isPasswordUpdated) {
        if (route.params.parent === 'SignUp') {
          Alert.alert(
            'Account Created',
            'Your account has been successfully created.',
            [{text: 'OK', onPress: () => navigation.navigate('LoginPage')}]
          );
        } else {
          Alert.alert('Success!', 'Your Password Reset Successful.', [
            {text: 'OK', onPress: () => navigation.navigate('LoginPage')}
          ]);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return {
    formValues,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit
  };
};

export default useResetPassword;
