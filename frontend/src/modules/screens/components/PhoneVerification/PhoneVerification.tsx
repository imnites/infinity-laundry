import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, OtpInput} from '../../../components/common/components';
import {usePhoneVerificationHandlers} from '../SignUp/hooks';
import {getVerificationMessage} from '../../../utils/signUpUtil';
import {Provider as PaperProvider, Title} from 'react-native-paper';

interface PhoneVerificationProps {
  navigation: any;
  route: any;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  navigation,
  route,
}) => {
  const {
    isGeneratingOTP,
    isOTPValidating,
    formDetails,
    setFormDetails,
    onOTPChange,
    handleGetOTP,
    handlePhoneVerification,
  } = usePhoneVerificationHandlers({
    route,
    navigation,
  });

  useEffect(() => {
    setTimeout(() => {
      if (formDetails.resendTimeOutInSec > 0) {
        setFormDetails(prevDetails => ({
          ...prevDetails,
          resendTimeOutInSec: formDetails.resendTimeOutInSec - 1,
        }));
      }
    }, 1000);
  }, [formDetails, setFormDetails]);

  const styles = useStyles();

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Title style={styles.titleText}>Phone Verification</Title>
        <View style={styles.content}>
          <View style={styles.numberInfoContainer}>
            <Text style={styles.numberInfoMessage}>
              {getVerificationMessage(route.params.otpInput)}
            </Text>
          </View>
          <View style={styles.otpInputContainer}>
            <OtpInput otpLength={6} onOTPChange={onOTPChange} editable={true} />
          </View>
          <View style={styles.resendContainer}>
            <Text style={styles.resendMessage}>
              Haven't received the Verification code?
            </Text>
            <View style={styles.resendButtonContainer}>
              <Button
                classes={{
                  button: styles.resendButton,
                  buttonText: styles.resendButtonText,
                }}
                name="Resend"
                loading={isGeneratingOTP}
                disabled={formDetails.resendTimeOutInSec > 0}
                onPress={handleGetOTP}
              />
              {formDetails.resendTimeOutInSec > 0 && (
                <Text>{` in ${formDetails.resendTimeOutInSec} Sec`}</Text>
              )}
            </View>
          </View>
          <View style={styles.verifyButtonContainer}>
            <Button
              classes={{
                button: styles.verifyButton,
                buttonText: styles.verifyButtonText,
              }}
              name={'Verify'}
              loading={isOTPValidating}
              disabled={isOTPValidating}
              onPress={handlePhoneVerification}
            />
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default PhoneVerification;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 24,
    },
    content: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    numberInfoContainer: {
      marginBottom: 20,
    },
    numberInfoMessage: {
      textAlign: 'center',
    },
    otpInputContainer: {
      marginBottom: 20,
    },
    resendContainer: {
      marginBottom: 20,
    },
    resendMessage: {
      textAlign: 'center',
    },
    resendButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    resendButton: {},
    resendButtonText: {
      color: '#3930d8',
    },
    verifyButtonContainer: {
      width: '100%',
      alignItems: 'center',
    },
    verifyButton: {
      backgroundColor: '#3930d8',
      textDecorationLine: 'underline',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 3,
      width: '75%',
      height: 40,
      borderRadius: 16,
    },
    verifyButtonText: {
      color: 'white',
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: 20,
    },
  });
};
