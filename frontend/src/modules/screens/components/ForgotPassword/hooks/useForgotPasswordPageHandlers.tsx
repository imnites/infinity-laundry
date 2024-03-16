import {useState, useCallback} from 'react';
import {Alert} from 'react-native';

interface ForgotPasswordHandlersPropsType {
  navigation: any;
  generatePhoneOTP: any;
  validatePhoneOTP: any;
  updatePassword: any;
}

const isEmail = (text: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

const isPhoneNumber = (text: string): boolean => {
  const phoneRegex = /^\d{10}$/; // Matches a 10-digit number
  return phoneRegex.test(text.replace(/\D/g, '')); // Remove non-digit characters before testing
};

const useForgotPasswordPageHandlers = ({
  generatePhoneOTP,
  validatePhoneOTP,
  navigation,
  updatePassword,
}: ForgotPasswordHandlersPropsType) => {
  const [values, setValues] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    error: '',
    verified: false,
    phoneOTP: '',
    isOtpSent: false,
    otpToken: '',
    accessToken: '',
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
    if (!isEmail(values.userName) && !isPhoneNumber(values.userName)) {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid email address or phone number.',
      );
      return;
    }

    try {
      const {
        success: isOTPSent,
        verificationToken,
        phoneNumber: {phoneNumber},
      } = await generatePhoneOTP({
        otpInput: isEmail(values.userName)
          ? {email: values.userName}
          : {
              phoneNumber: {
                countryCode: '+91',
                phoneNumber: values.userName,
              },
            },
      });
      if (isOTPSent) {
        setValues({
          ...values,
          isOtpSent: isOTPSent,
          otpToken: verificationToken,
        });
        Alert.alert('OTP Sent', `An OTP has been sent to ${phoneNumber}`);
      }
    } catch (error) {
      Alert.alert(
        'Account Not Found',
        'This account does not exist. Please sign up.',
      );
    }
  };

  const handlePhoneVerification = async () => {
    try {
      const {verified, accessToken} = await validatePhoneOTP({
        verificationToken: values.otpToken,
        otp: values.phoneOTP,
      });
      if (verified) {
        setValues({...values, accessToken: accessToken, verified: verified});
        Alert.alert('Success', 'OTP Verified Successfully');
      } else {
        Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
      }
    } catch (error) {
      Alert.alert(
        'Number Not Found',
        'The provided phone number does not exist. Please check the number and try again.',
      );
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (values.password !== values.confirmPassword) {
        setValues({...values, error: "Passwords don't match"});
        return;
      }

      if (values.password.length < 8) {
        setValues({...values, error: "Passwords don't match"});
        return;
      }

      const headers = {authorization: `Basic ${values.accessToken}`};
      const result = await updatePassword(
        {
          password: values.password,
        },
        headers,
      );
      console.log('Result', result);
      if (result) {
        Alert.alert(
          'Success!',
          'Your password has been updated successfully.',
          [{text: 'OK', onPress: () => navigation.navigate('LoginPage')}],
        );
      }
    } catch (error) {
      Alert.alert(
        'Number Not Found',
        'The provided phone number does not exist. Please check the number and try again.',
      );
    }
  };

  return {
    values,
    setValues,
    onUserNameChange,
    handleSubmit,
    handlePhoneVerification,
    handleUpdatePassword,
  };
};

export default useForgotPasswordPageHandlers;
