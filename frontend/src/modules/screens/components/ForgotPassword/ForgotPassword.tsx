import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {Button, Title} from '../../../components/common/components';
import {useStyles, useForgotPasswordPageHandlers} from './hooks';
import {
  useGeneratePhoneOTP,
  useValidatePhoneOTP,
  useUpdatePassword,
} from '../../../components/common/hooks/users';

interface ForgotPasswordPageProps {
  navigation: any;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  navigation,
}) => {
  const {generatePhoneOTP, loading: isGeneratingOTP} = useGeneratePhoneOTP();
  const {validatePhoneOTP, loading: isOTPValidating} = useValidatePhoneOTP();
  const {updatePassword, loading: isResettingPassword} = useUpdatePassword();

  const {
    values,
    setValues,
    onUserNameChange,
    handleSubmit,
    handlePhoneVerification,
    handleResetPassword,
  } = useForgotPasswordPageHandlers({
    generatePhoneOTP,
    validatePhoneOTP,
    navigation,
    updatePassword,
  });

  const styles = useStyles({values});
  return (
    <View style={styles.container}>
      <Title title="Forgot Password" />
      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={values.userName}
        onChangeText={onUserNameChange}
        editable={!values.isOtpSent}
      />
      <Button
        name={values.isOtpSent ? 'SENT OTP' : 'SEND OTP'}
        onPress={handleSubmit}
        loading={isGeneratingOTP}
        classes={{
          button: styles.submitButton,
          buttonText: styles.submitButtonText,
        }}
        disabled={isGeneratingOTP || values.isOtpSent}
      />
      {values.isOtpSent && (
        <>
          <TextInput
            style={styles.phoneOTPInputStyles}
            value={values.phoneOTP}
            onChangeText={text =>
              setValues({
                ...values,
                phoneOTP: text,
              })
            }
            placeholder="Enter OTP"
            editable={!values.verified}
            maxLength={6}
          />
          <Button
            name={values.verified ? 'VERIFIED' : 'VERIFY'}
            onPress={handlePhoneVerification}
            loading={isOTPValidating}
            disabled={isOTPValidating || values.verified}
            classes={{
              button: styles.verifyButton,
              buttonText: styles.verifyButtonText,
            }}
          />
        </>
      )}
      {values.verified && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={text =>
              setValues({...values, password: text, error: ''})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={text =>
              setValues({...values, confirmPassword: text, error: ''})
            }
          />
          {values.error ? (
            <Text style={styles.error}>{values.error}</Text>
          ) : null}
          <Button
            name="Reset Password"
            onPress={handleResetPassword}
            loading={isResettingPassword}
            disabled={isResettingPassword}
            classes={{
              button: styles.resetPasswordButton,
              buttonText: styles.resetPasswordButtonText,
            }}
          />
        </>
      )}
    </View>
  );
};

export default ForgotPasswordPage;
