import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {
  useGeneratePhoneOTP,
  useValidatePhoneOTP,
} from '../../../../components/common/hooks/users';

interface PhoneVerificationHandlersType {
  navigation: any;
  route: any;
}

const DEFAULT_RESEND_TIME_IN_SEC = 30;

const usePhoneVerificationHandlers = ({
  route,
  navigation,
}: PhoneVerificationHandlersType) => {
  const {
    formData: {phoneNumber},
    token,
  } = route.params;
  const {generatePhoneOTP, loading: isGeneratingOTP} = useGeneratePhoneOTP();
  const {validatePhoneOTP, loading: isOTPValidating} = useValidatePhoneOTP();

  const [formDetails, setFormDetails] = useState({
    phoneNumber: route.params.formData.phoneNumber,
    otp: '',
    resendTimeOutInSec: DEFAULT_RESEND_TIME_IN_SEC,
    otpToken: '',
    verified: false,
  });

  const onOTPChange = useCallback((value: any) => {
    setFormDetails(prevDetails => ({...prevDetails, otp: value}));
  }, []);

  const handleGetOTP = async () => {
    try {
      const {success: isOTPSent, verificationToken} = await generatePhoneOTP({
        otpInput: {
          id: token,
        },
      });
      if (isOTPSent) {
        setFormDetails(prevDetails => ({
          ...prevDetails,
          resendTimeOutInSec: DEFAULT_RESEND_TIME_IN_SEC,
          otpToken: verificationToken,
        }));
        Alert.alert(
          'OTP Sent',
          `An OTP has been sent to ********${phoneNumber.toString().slice(-2)}`,
        );
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
        verificationToken: formDetails.otpToken,
        otp: formDetails.otp,
      });
      if (verified) {
        setFormDetails(prevDetails => ({
          ...prevDetails,
          otpToken: '',
          verified: true,
          resendTimeOutInSec: 0,
        }));
        Alert.alert('Success', 'OTP Verified Successfully.');
        navigation.navigate('ResetPassword', {
          ...route.params,
          userId,
          accessToken,
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
    isGeneratingOTP,
    isOTPValidating,
    formDetails,
    setFormDetails,
    onOTPChange,
    handleGetOTP,
    handlePhoneVerification,
  };
};

export default usePhoneVerificationHandlers;
