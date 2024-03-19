import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {OtpInput} from '~/modules/common/components';
import {usePhoneVerificationHandlers} from '../SignUp/hooks';
import {getVerificationMessage} from '~/utils';
import {Button, Provider as PaperProvider, Title} from 'react-native-paper';

interface PhoneVerificationProps {
  navigation: any;
  route: any;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  navigation,
  route
}) => {
  const {
    isGeneratingOTP,
    isOTPValidating,
    formDetails,
    setFormDetails,
    onOTPChange,
    handleGetOTP,
    handlePhoneVerification
  } = usePhoneVerificationHandlers({
    route,
    navigation
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
    <PaperProvider>
      <View style={styles.container}>
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
              style={styles.resendButton}
              labelStyle={styles.resendButtonText}
              loading={isGeneratingOTP}
              disabled={formDetails.resendTimeOutInSec > 0}
              onPress={handleGetOTP}>
              {isGeneratingOTP ? '' : 'Resend'}
            </Button>
            {formDetails.resendTimeOutInSec > 0 && (
              <Text style={styles.sec}>
                {` in ${formDetails.resendTimeOutInSec} Sec`}
              </Text>
            )}
          </View>
          <Button
            style={styles.verifyButton}
            labelStyle={styles.verifyButtonText}
            mode="contained"
            loading={isOTPValidating}
            disabled={isOTPValidating}
            onPress={handlePhoneVerification}>
            {isOTPValidating ? '' : 'Verify'}
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

export default PhoneVerification;

const useStyles = () => {
  return StyleSheet.create({
    container: {
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
      height: 45,
      justifyContent: 'center',
      borderRadius: 5,
      paddingVertical: 10
    },
    verifyButtonText: {
      color: 'white',
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: 20
    },
    sec: {
      marginTop: 9.5,
      marginLeft: -12,
      color: 'black'
    }
  });
};
