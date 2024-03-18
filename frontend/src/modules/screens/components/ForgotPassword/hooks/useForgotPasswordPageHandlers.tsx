import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {useGeneratePhoneOTP} from '../../../../components/common/hooks/users';
import {
  isValidEmail,
  isValidPhoneNumber,
  getOTPInput,
} from '../../../../utils/signUpUtil';

interface ForgotPasswordHandlersPropsType {
  navigation: any;
}

const useForgotPasswordPageHandlers = ({
  navigation,
}: ForgotPasswordHandlersPropsType) => {
  const {generatePhoneOTP} = useGeneratePhoneOTP();
  const [values, setValues] = useState({
    userName: '',
  });

  const onUserNameChange = useCallback(
    (text: string) =>
      setValues({
        ...values,
        userName: text,
      }),
    [values],
  );

  const handleSubmit = async () => {
    if (
      !isValidEmail(values.userName) &&
      !isValidPhoneNumber(values.userName)
    ) {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid email address or phone number.',
      );
      return;
    }

    try {
      const {success, verificationToken} = await generatePhoneOTP({
        otpInput: getOTPInput(values.userName),
      });

      if (success) {
        navigation.navigate('PhoneVerification', {
          parent: 'forgetPassword',
          link: 'ResetPassword',
          contact: values.userName,
          token: verificationToken,
        });
      }
    } catch (error) {
      Alert.alert(
        'Account Not Found',
        'This account does not exist. Please sign up.',
      );
    }
  };

  return {
    values,
    setValues,
    onUserNameChange,
    handleSubmit,
  };
};

export default useForgotPasswordPageHandlers;
