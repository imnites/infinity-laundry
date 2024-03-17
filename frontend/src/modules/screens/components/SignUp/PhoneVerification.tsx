import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from '../../../components/common/components';
import OtpInput from './OTPInput';
import {usePhoneVerificationHandlers} from './hooks';

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

  const styles = useStyles(formDetails);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.headingText}>Phone Verification</Text>
      </View>
      <View style={styles.flex}>
        <Text style={styles.numberInfoMessage}>
          {`Verification code has been sent to ********${formDetails.phoneNumber
            .toString()
            .slice(-2)}`}
        </Text>
      </View>
      <View style={styles.flex}>
        <View style={styles.otpInput}>
          <OtpInput
            otpLength={6}
            onOTPChange={onOTPChange}
            editable={!formDetails.verified}
          />
        </View>
      </View>
      <View style={styles.flex}>
        <Text style={styles.resendMessage}>
          Haven't received the Verification code?
        </Text>
      </View>
      <View style={styles.flex}>
        <View style={styles.resendButtonContainer}>
          <Button
            classes={{
              button: styles.resendButton,
              buttonText: styles.resendButtonText,
            }}
            name="Resend"
            loading={isGeneratingOTP}
            disabled={
              formDetails.verified || formDetails.resendTimeOutInSec > 0
            }
            onPress={handleGetOTP}
          />
          <Text>{` in ${formDetails.resendTimeOutInSec} Sec`}</Text>
        </View>
      </View>
      <View style={styles.flex}>
        <Button
          classes={{
            button: styles.verifyButton,
            buttonText: styles.verifyButtonText,
          }}
          name={formDetails.verified ? 'Verified' : 'Verify'}
          loading={isOTPValidating}
          disabled={isOTPValidating || formDetails.verified}
          onPress={handlePhoneVerification}
        />
      </View>
    </View>
  );
};

export default PhoneVerification;

const useStyles = ({verified}: any) => {
  return StyleSheet.create({
    container: {
      padding: 16,
    },
    flex: {
      display: 'flex',
      flexDirection: 'row',
    },
    headingText: {
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingRight: 24,
      paddingTop: 2,
    },
    numberInfoMessage: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    resendMessage: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    resendButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    resendButton: {},
    resendButtonText: {
      color: verified ? '#999' : '#3930d8',
    },
    verifyButton: {
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: verified ? '#ccc' : '#3930d8',
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
    otpInput: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });
};
