import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {Button, Title} from '../../../components/common/components';
import {useForgotPasswordPageHandlers} from './hooks';
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
        classes={buttonStyles}
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
            classes={buttonStyles}
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
            classes={buttonStyles}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ForgotPasswordPage;
