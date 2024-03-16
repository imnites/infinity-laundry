import {useState} from 'react';
import {Alert} from 'react-native';

interface SignUpPage2HandlersType {
  navigation: any;
  route: any;
  generatePhoneOTP: any;
  validatePhoneOTP: any;
}

const useSignUpPage2Handlers = ({
  route,
  navigation,
  generatePhoneOTP,
  validatePhoneOTP,
}: SignUpPage2HandlersType) => {
  const {formData, token} = route.params;
  const [otpValues, setOtpValues] = useState({
    phoneOTP: '',
    isOtpSent: false,
    otpToken: '',
  });

  const handleGetOTP = async () => {
    try {
      const {
        success: isOTPSent,
        verificationToken,
        phoneNumber: {phoneNumber},
      } = await generatePhoneOTP({
        otpInput: {
          id: token,
        },
      });
      if (isOTPSent) {
        setOtpValues({
          ...otpValues,
          isOtpSent: isOTPSent,
          otpToken: verificationToken,
        });
        Alert.alert('OTP Sent', `An OTP has been sent to ${phoneNumber}`);
      }
    } catch (error) {
      Alert.alert(
        'Number Not Found',
        'Invalid phone number. Please check and try again.',
      );
    }
  };

  const handlePhoneVerification = async () => {
    try {
      const {verified, userId, accessToken} = await validatePhoneOTP({
        verificationToken: otpValues.otpToken,
        otp: otpValues.phoneOTP,
      });
      if (verified) {
        Alert.alert('Success', 'OTP Verified Successfully.');
        navigation.navigate('SignUpPage3', {
          ...route.params,
          userId,
          accessToken,
        });
        setOtpValues({
          phoneOTP: '',
          isOtpSent: false,
          otpToken: '',
        });
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
  return {
    otpValues,
    setOtpValues,
    formData,
    handleGetOTP,
    handlePhoneVerification,
  };
};

export default useSignUpPage2Handlers;
