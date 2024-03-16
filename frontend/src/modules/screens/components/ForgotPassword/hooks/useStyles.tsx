import {StyleSheet} from 'react-native';

interface StylePropsType {
  values: any;
}

const useStyles = ({values}: StylePropsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    input: {
      width: '90%',
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
      position: 'relative',
      left: 20,
      top: -10,
    },
    submitButton: {
      width: '90%',
      backgroundColor: values.isOtpSent ? '#ccc' : 'blue',
      padding: 10,
      borderRadius: 5,
      marginBottom: 30,
    },
    submitButtonText: {
      color: values.isOtpSent ? '#999' : 'white',
      textAlign: 'center',
    },
    phoneOTPInputStyles: {
      width: '25%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
      textAlign: 'center',
    },
    verifyButton: {
      width: '25%',
      backgroundColor: values.verified ? '#ccc' : 'blue',
      padding: 10,
      borderRadius: 5,
      marginBottom: 30,
    },
    verifyButtonText: {
      color: values.verified ? '#999' : 'white',
      textAlign: 'center',
    },
    resetPasswordButton: {
      width: '90%',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    resetPasswordButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });
};

export default useStyles;
