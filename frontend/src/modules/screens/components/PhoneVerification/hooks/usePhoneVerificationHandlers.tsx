import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {
  useGeneratePhoneOTP,
  useValidatePhoneOTP,
} from '../../../../components/common/hooks/users';
import {getOTPInput, isValidEmail} from '../../../../utils/signUpUtil';

const DEFAULT_RESEND_TIME_IN_SEC = 30;

const getOTPSentAlertMessage = (contact: any) => {
  if (isValidEmail(contact)) {
    return 'Verification code has been sent to linked mobile number.';
  }

  return `An OTP has been sent to ********${contact.toString().slice(-2)}`;
};

interface PhoneVerificationHandlersType {
  navigation: any;
  route: any;
}

const usePhoneVerificationHandlers = ({
  route,
  navigation,
}: PhoneVerificationHandlersType) => {
  const {link, contact, token} = route.params;
  const {generatePhoneOTP, loading: isGeneratingOTP} = useGeneratePhoneOTP();
  const {validatePhoneOTP, loading: isOTPValidating} = useValidatePhoneOTP();

  const [formDetails, setFormDetails] = useState({
    otp: '',
    otpToken: token,
    resendTimeOutInSec: DEFAULT_RESEND_TIME_IN_SEC,
  });

  const onOTPChange = useCallback((value: any) => {
    setFormDetails(prevDetails => ({...prevDetails, otp: value}));
  }, []);

  const handleGetOTP = async () => {
    try {
      const {success: isOTPSent, verificationToken} = await generatePhoneOTP({
        otpInput: getOTPInput(contact),
      });

      if (isOTPSent) {
        setFormDetails(prevDetails => ({
          ...prevDetails,
          resendTimeOutInSec: DEFAULT_RESEND_TIME_IN_SEC,
          otpToken: verificationToken,
        }));
        Alert.alert('OTP Sent', getOTPSentAlertMessage(contact));
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
          resendTimeOutInSec: 0,
        }));
        Alert.alert('Success', 'OTP Verified Successfully.');
        if (route.params?.onCallbackFunction) {
          route.params.onCallbackFunction({
            userId: route.params.userId,
            accessToken: route.params.accessToken,
          });
        }
        navigation.navigate(link, {
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
