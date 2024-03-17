import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from '../../../components/common/components';
import {
  useGeneratePhoneOTP,
  useValidatePhoneOTP,
} from '../../../components/common/hooks/users';
import Icon from 'react-native-vector-icons/Entypo';
import OtpInput from './OTPInput';
// import {useSignUpPage2Handlers, useSignUpPage2Styles} from './hooks';

const DEFAULT_RESEND_TIME_IN_SEC = 30;

const useStyles = () => {
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
      color: '#3930d8',
    },
    verifyButton: {
      marginLeft: 'auto',
      marginRight: 'auto',
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
    otpInput: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });
};

interface SignUpPage2Props {
  navigation: any;
  route: any;
}

const SignUpPage2: React.FC<SignUpPage2Props> = ({navigation, route}) => {
  const {generatePhoneOTP, loading: isGeneratingOTP} = useGeneratePhoneOTP();
  const {validatePhoneOTP, loading: isOTPValidating} = useValidatePhoneOTP();
  const [resendTimeOutInSec, setResendTimeOutInSec] = useState(
    DEFAULT_RESEND_TIME_IN_SEC,
  );

  useEffect(() => {
    setTimeout(() => {
      if (resendTimeOutInSec > 0) {
        setResendTimeOutInSec(resendTimeOutInSec - 1);
      }
    }, 1000);
  }, [resendTimeOutInSec]);

  const {
    // otpValues,
    // setOtpValues,
    // formData,
    // handleGetOTP,
    // handlePhoneVerification,
  } = {};
  // } = useSignUpPage2Handlers({
  //   route,
  //   navigation,
  //   generatePhoneOTP,
  //   validatePhoneOTP,
  // });

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Icon size={24} name="chevron-thin-left" />
        <Text style={styles.headingText}>Phone Verification</Text>
      </View>
      <View style={styles.flex}>
        <Text style={styles.numberInfoMessage}>
          Verification code has been sent to ********52
        </Text>
      </View>
      <View style={styles.flex}>
        <View style={styles.otpInput}>
          <OtpInput otpLength={6} />
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
            onPress={() => {}}
            disabled={false}
          />
          <Text>{` in ${resendTimeOutInSec} Sec`}</Text>
        </View>
      </View>
      <View style={styles.flex}>
        <Button
          classes={{
            button: styles.verifyButton,
            buttonText: styles.verifyButtonText,
          }}
          name="Verify"
          onPress={() => {}}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default SignUpPage2;
