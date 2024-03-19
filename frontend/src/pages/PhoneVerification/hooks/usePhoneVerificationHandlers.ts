import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {useGeneratePhoneOTP, useValidatePhoneOTP} from '~/hooks';
import {getOTPInput, isValidEmail} from '~/utils';

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
  navigation
}: PhoneVerificationHandlersType) => {
  const {link, contact, otpInput, verificationToken} = route.params;
  const {generatePhoneOTP, loading: isGeneratingOTP} = useGeneratePhoneOTP();
  const {validatePhoneOTP, loading: isOTPValidating} = useValidatePhoneOTP();

  const [formDetails, setFormDetails] = useState({
    otp: '',
    verificationToken: verificationToken,
    resendTimeOutInSec: DEFAULT_RESEND_TIME_IN_SEC
  });

  const onOTPChange = useCallback((value: any) => {
    setFormDetails(prevDetails => ({...prevDetails, otp: value}));
  }, []);

  const handleGetOTP = async () => {
    try {
      const {success: isOTPSent, verificationToken: newVerificationToken} =
        await generatePhoneOTP({
          otpInput:
            route.params.link === 'SignUp'
              ? {
                  id: otpInput
                }
              : getOTPInput(route.params.contact)
        });

      if (isOTPSent) {
        setFormDetails(prevDetails => ({
          ...prevDetails,
          resendTimeOutInSec: DEFAULT_RESEND_TIME_IN_SEC,
          verificationToken: newVerificationToken
        }));
        Alert.alert('OTP Sent', getOTPSentAlertMessage(contact));
      }
    } catch (error) {
      Alert.alert(
        'Number Not Found',
        'Invalid phone number. Please check and try again.'
      );
    }
  };

  const handlePhoneVerification = async () => {
    try {
      const {verified, userId, accessToken} = await validatePhoneOTP({
        verificationToken: formDetails.verificationToken,
        otp: formDetails.otp
      });
      if (verified) {
        setFormDetails(prevDetails => ({
          ...prevDetails,
          resendTimeOutInSec: 0
        }));
        Alert.alert('Success', 'OTP Verified Successfully.');
        if (route.params.parent === 'SignUp') {
          await route.params.onSaveUserDraft({
            userId: userId,
            accessToken: accessToken
          });
        }
        navigation.navigate(link, {
          ...route.params,
          userId,
          accessToken
        });
      } else {
        Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
      }
    } catch (error) {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
    }
  };
  return {
    isGeneratingOTP,
    isOTPValidating,
    formDetails,
    setFormDetails,
    onOTPChange,
    handleGetOTP,
    handlePhoneVerification
  };
};

export default usePhoneVerificationHandlers;
