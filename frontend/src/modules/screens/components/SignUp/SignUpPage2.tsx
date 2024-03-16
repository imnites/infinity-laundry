import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {Button} from '../../../components/common/components';
import {
  useGeneratePhoneOTP,
  useValidatePhoneOTP,
} from '../../../components/common/hooks/users';
import {useSignUpPage2Handlers, useSignUpPage2Styles} from './hooks';

interface SignUpPage2Props {
  navigation: any;
  route: any;
}

const SignUpPage2: React.FC<SignUpPage2Props> = ({navigation, route}) => {
  const {generatePhoneOTP, loading: isGeneratingOTP} = useGeneratePhoneOTP();
  const {validatePhoneOTP, loading: isOTPValidating} = useValidatePhoneOTP();

  const {
    otpValues,
    setOtpValues,
    formData,
    handleGetOTP,
    handlePhoneVerification,
  } = useSignUpPage2Handlers({
    route,
    navigation,
    generatePhoneOTP,
    validatePhoneOTP,
  });
  const styles = useSignUpPage2Styles({otpValues});
  return (
    <>
      <Text style={styles.title}>Verification</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.details}>Phone Number: {formData.phoneNumber}</Text>
        <Button
          name={otpValues.isOtpSent ? 'SENT OTP' : 'SEND OTP'}
          onPress={handleGetOTP}
          loading={isGeneratingOTP}
          disabled={isGeneratingOTP || otpValues.isOtpSent}
          classes={{
            button: styles.otpButton,
            buttonText: styles.otpButtonText,
          }}
        />
        {otpValues.isOtpSent && (
          <>
            <TextInput
              style={styles.input}
              value={otpValues.phoneOTP}
              onChangeText={text =>
                setOtpValues({
                  ...otpValues,
                  phoneOTP: text,
                })
              }
              placeholder="Enter OTP"
              maxLength={6}
            />
            <Button
              name="VERIFY"
              onPress={handlePhoneVerification}
              loading={isOTPValidating}
              disabled={isOTPValidating}
              classes={{
                button: styles.verifyButton,
                buttonText: styles.verifyButtonText,
              }}
            />
          </>
        )}
      </View>
    </>
  );
};

export default SignUpPage2;
