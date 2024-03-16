import {StyleSheet} from 'react-native';

interface otpValuesPropsType {
  isOtpSent: boolean;
}
interface SignUpPage2StylesPropsType {
  otpValues: otpValuesPropsType;
}

const useSignUpPage2Styles = ({otpValues}: SignUpPage2StylesPropsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    inputContainer: {
      marginVertical: 10,
      width: '50%',
      position: 'relative',
      top: 150,
      alignSelf: 'center',
    },
    input: {
      width: '40%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      alignSelf: 'center',
      position: 'relative',
      top: 25,
      textAlign: 'center',
    },
    otpButton: {
      width: '45%',
      backgroundColor: otpValues.isOtpSent ? '#ccc' : 'blue',
      padding: 10,
      borderRadius: 5,
      alignSelf: 'center',
      position: 'relative',
      top: 10,
    },
    otpButtonText: {
      color: otpValues.isOtpSent ? '#999' : 'white',
      textAlign: 'center',
    },
    verifyButton: {
      width: '35%',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      alignSelf: 'center',
      position: 'relative',
      top: 25,
    },
    verifyButtonText: {
      color: 'white',
      textAlign: 'center',
    },
    details: {},
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      position: 'relative',
      top: 125,
      alignSelf: 'center',
    },
  });
};

export default useSignUpPage2Styles;
