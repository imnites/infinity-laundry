import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {Button, Title} from '../../../components/common/components';
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
  const styles = useSignUpPage2Styles();
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
  return (
    <View style={styles.container}>
      <Title title="Sign Up" />
      <View style={styles.inputContainer}>
        <Text>Phone Number: {formData.phoneNumber}</Text>
        {!otpValues.isOtpSent ? (
          <Button
            name="SEND OTP"
            onPress={handleGetOTP}
            loading={isGeneratingOTP}
            disabled={isGeneratingOTP}
            classes={{
              button: styles.otpButton,
              buttonText: styles.otpButtonText,
            }}
          />
        ) : (
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
    </View>
  );
};

export default SignUpPage2;
