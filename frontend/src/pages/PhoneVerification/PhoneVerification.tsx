import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {OtpInput, Button} from '~/components/common';
import {usePhoneVerificationHandlers} from '../SignUp/hooks';
import {getVerificationMessage} from '~/utils';
import {Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface PhoneVerificationProps {
  route: any;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({route}) => {
  const {
    isGeneratingOTP,
    isOTPValidating,
    formDetails,
    setFormDetails,
    onOTPChange,
    handleGetOTP,
    handlePhoneVerification,
    handleBackButton
  } = usePhoneVerificationHandlers({
    route
  });

  useEffect(() => {
    setTimeout(() => {
      if (formDetails.resendTimeOutInSec > 0) {
        setFormDetails(prevDetails => ({
          ...prevDetails,
          resendTimeOutInSec: formDetails.resendTimeOutInSec - 1
        }));
      }
    }, 1000);
  }, [formDetails, setFormDetails]);

  const styles = useStyles();

  return (
    <>
      <View style={styles.phoneVerification}>
        <Title style={styles.titleText}>Phone Verification</Title>
        <View style={styles.content}>
          <View style={styles.numberInfoContainer}>
            <Text style={styles.numberInfoMessage}>
              {getVerificationMessage(route.params.contact)}
            </Text>
          </View>
          <View style={styles.otpInputContainer}>
            <OtpInput otpLength={6} onOTPChange={onOTPChange} editable={true} />
          </View>
          <Text style={styles.resendMessage}>
            Haven't received the Verification code?
          </Text>
          <View style={styles.resendContainer}>
            <Button
              onPress={handleGetOTP}
              loading={isGeneratingOTP}
              disabled={formDetails.resendTimeOutInSec > 0}
              classes={{
                button: styles.resendButton,
                buttonText: styles.resendButtonText
              }}>
              Resend
            </Button>
            {formDetails.resendTimeOutInSec > 0 && (
              <Text>{` in ${formDetails.resendTimeOutInSec} Sec`}</Text>
            )}
          </View>
          <Button
            onPress={handlePhoneVerification}
            loading={isOTPValidating}
            disabled={isOTPValidating}
            classes={{
              button: styles.verifyButton,
              buttonText: styles.verifyButtonText
            }}>
            Verify
          </Button>
          <Button
            onPress={handleBackButton}
            classes={{
              button: styles.backToLoginButton,
              buttonText: styles.backToLoginButtonText
            }}
            leftIcon={<Icon name="arrow-left" size={16} color="#3930d8" />}>
            Back to Login
          </Button>
        </View>
      </View>
    </>
  );
};

export default PhoneVerification;

const useStyles = () => {
  return StyleSheet.create({
    phoneVerification: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff'
    },
    titleText: {
      color: '#3930d8',
      marginTop: 20,
      marginBottom: 10,
      fontSize: 24
    },
    content: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 20
    },
    numberInfoContainer: {
      marginBottom: 20
    },
    numberInfoMessage: {
      textAlign: 'center'
    },
    otpInputContainer: {
      marginBottom: 20
    },
    resendContainer: {
      flexDirection: 'row',
      marginBottom: 20
    },
    resendMessage: {
      textAlign: 'center'
    },
    resendButton: {},
    resendButtonText: {
      color: '#3930d8'
    },
    verifyButton: {
      width: '100%',
      backgroundColor: '#3930d8',
      padding: 10,
      borderRadius: 5
    },
    verifyButtonText: {
      color: 'white',
      textAlign: 'center'
    },
    backToLoginButton: {
      width: '100%',
      padding: 10
    },
    backToLoginButtonText: {
      color: '#3930d8',
      textAlign: 'center'
    }
  });
};
