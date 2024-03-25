import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {OtpInput} from '~/components/common';
import {usePhoneVerificationHandlers} from '../SignUp/hooks';
import {getVerificationMessage} from '~/utils';
import {Button, Title} from 'react-native-paper';
import BackButton from '~/components/common/BackButton';
import {useNavigation} from '@react-navigation/native';

interface PhoneVerificationProps {
  route: any;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({route}) => {
  const navigation = useNavigation();
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

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.backButton}>
        <BackButton size={35} handleBackPress={handleBackPress} />
      </View>
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
    </>
  );
};

export default PhoneVerification;

const useStyles = () => {
  return StyleSheet.create({
    backButton: {
      padding: 20,
      backgroundColor: '#fff'
    },
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
