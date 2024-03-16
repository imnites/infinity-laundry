import {StyleSheet} from 'react-native';

const useSignUpPage2Styles = () => {
  return StyleSheet.create({
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
    otpButton: {
      width: '100%',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    otpButtonText: {
      color: 'white',
      textAlign: 'center',
    },
    verifyButton: {
      width: '100%',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    verifyButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });
};

export default useSignUpPage2Styles;
