import {useState, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {useGeneratePhoneOTP} from '~/hooks';
import {isValidEmail, isValidPhoneNumber, mapToPhoneNumber} from '~/utils';

const mapToOTPInput = (value: string) => {
  if (isValidEmail(value)) {
    return {email: value};
  }

  const phoneNumber = mapToPhoneNumber(value);

  if (phoneNumber) {
    return {
      phoneNumber: phoneNumber
    };
  }

  return {
    id: value
  };
};

interface ForgotPasswordHandlersPropsType {
  navigation: any;
}

const useForgotPasswordPageHandlers = ({
  navigation
}: ForgotPasswordHandlersPropsType) => {
  const {generatePhoneOTP} = useGeneratePhoneOTP();
  const [values, setValues] = useState({
    userName: ''
  });

  const onUserNameChange = useCallback(
    (text: string) =>
      setValues({
        ...values,
        userName: text
      }),
    [values]
  );

  const handleSubmit = async () => {
    if (
      !isValidEmail(values.userName) &&
      !isValidPhoneNumber(values.userName)
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email address or phone number',
        position: 'bottom'
      });
      return;
    }

    try {
      const {success, verificationToken, phoneNumber} = await generatePhoneOTP({
        otpInput: mapToOTPInput(values.userName)
      });

      if (success) {
        navigation.navigate('PhoneVerification', {
          parent: 'ForgetPassword',
          link: 'ResetPassword',
          contact: phoneNumber
            ? `${phoneNumber.countryCode} ${phoneNumber.phoneNumber}`
            : null,
          verificationToken: verificationToken
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'This account does not exist. Please sign up',
        position: 'bottom'
      });
    }
  };

  return {
    values,
    setValues,
    onUserNameChange,
    handleSubmit
  };
};

export default useForgotPasswordPageHandlers;
