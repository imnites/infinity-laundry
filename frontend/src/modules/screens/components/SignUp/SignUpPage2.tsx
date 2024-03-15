import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import {Button, Title} from '../../../components/common/components';
import {
  useGeneratePhoneOTP,
  useValidatePhoneOTP,
} from '../../../components/common/hooks/users';

interface SignUpPage2Props {
  navigation: any;
  route: any;
}

const SignUpPage2: React.FC<SignUpPage2Props> = ({navigation, route}) => {
  const {generatePhoneOTP, loading: isGeneratingOTP} = useGeneratePhoneOTP();
  const {validatePhoneOTP, loading: isOTPValidating} = useValidatePhoneOTP();
  const {
    formData: {phoneNumber},
    token,
  } = route.params;
  const [otpValues, setOtpValues] = useState({
    phoneOTP: '',
    isOtpSent: false,
    otpToken: '',
  });

  const handleGetOTP = async () => {
    try {
      const {success: isOTPSent, verificationToken} = await generatePhoneOTP({
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
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  const handlePhoneVerification = async () => {
    try {
      const {verified, userId, accessToken} = await validatePhoneOTP({
        verificationToken: otpValues.otpToken,
        otp: otpValues.phoneOTP,
      });
      if (verified) {
        Alert.alert('Success', 'OTP Verified Successfully');
        navigation.navigate('SignUpPage3', {
          ...route.params,
          userId,
          accessToken,
        });
      } else {
        Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Title title="Sign Up" />
      <View style={styles.inputContainer}>
        <Text>Phone Number: {phoneNumber}</Text>
        {!otpValues.isOtpSent ? (
          <Button
            name="SEND OTP"
            onPress={handleGetOTP}
            loading={isGeneratingOTP}
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
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default SignUpPage2;
