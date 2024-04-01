import {useState, useCallback} from 'react';
import {useGeneratePhoneOTP, useValidatePhoneOTP} from '~/hooks';
import {getOTPInput, setTokenValue} from '~/utils';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const DEFAULT_RESEND_TIME_IN_SEC = 30;

interface PhoneVerificationHandlersType {
  route: any;
}

const usePhoneVerificationHandlers = ({
  route
}: PhoneVerificationHandlersType) => {
  const navigation = useNavigation();
  const {link, otpInput, verificationToken} = route.params;
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
            route.params.parent === 'SignUp'
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
        Toast.show({
          type: 'info',
          text1: 'OTP Sent',
          position: 'bottom'
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid phone number. Please check and try again',
        position: 'bottom'
      });
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
        Toast.show({
          type: 'success',
          text1: 'OTP Verified',
          position: 'bottom'
        });
        if (route.params.parent === 'SignUp') {
          await route.params.onSaveUserDraft({
            userId: userId,
            accessToken: accessToken
          });
        }
        await setTokenValue({
          accessToken: accessToken,
          refreshToken: undefined,
          tokenType: 'Basic'
        });
        (navigation.navigate as any)(link, {
          ...route.params,
          userId
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid OTP',
          position: 'bottom'
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        position: 'bottom'
      });
    }
  };

  const handleBackButton = useCallback(
    () => (navigation.navigate as any)('LoginPage'),
    [navigation.navigate]
  );

  return {
    isGeneratingOTP,
    isOTPValidating,
    formDetails,
    setFormDetails,
    onOTPChange,
    handleGetOTP,
    handlePhoneVerification,
    handleBackButton
  };
};

export default usePhoneVerificationHandlers;
