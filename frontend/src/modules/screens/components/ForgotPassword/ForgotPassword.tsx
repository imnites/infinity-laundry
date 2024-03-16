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
  const styles = useStyles();
  const {generatePhoneOTP, loading: isGeneratingOTP} = useGeneratePhoneOTP();
  const {validatePhoneOTP, loading: isOTPValidating} = useValidatePhoneOTP();
  const {updatePassword, loading: isUpdatingPassword} = useUpdatePassword();

  const {
    values,
    setValues,
    onUserNameChange,
    handleSubmit,
    handlePhoneVerification,
    handleUpdatePassword,
  } = useForgotPasswordPageHandlers({
    generatePhoneOTP,
    validatePhoneOTP,
    navigation,
    updatePassword,
  });

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
        name="Submit"
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
            style={styles.input}
            value={values.phoneOTP}
            onChangeText={text =>
              setValues({
                ...values,
                phoneOTP: text,
              })
            }
            placeholder="Enter OTP"
            editable={!values.verified}
          />
          <Button
            name="VERIFY"
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
            name="Update Password"
            onPress={handleUpdatePassword}
            loading={isUpdatingPassword}
            disabled={isUpdatingPassword}
            classes={{
              button: styles.updatePasswordButton,
              buttonText: styles.updatePasswordButtonText,
            }}
          />
        </>
      )}
    </View>
  );
};

export default ForgotPasswordPage;
