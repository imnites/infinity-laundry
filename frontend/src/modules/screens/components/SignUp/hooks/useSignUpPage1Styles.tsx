import {StyleSheet} from 'react-native';

const useSignUpPage1Styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    input: {
      width: '100%',
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
      marginBottom: 5,
      position: 'relative',
      top: -10,
    },
    continueButton: {
      width: '100%',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    continueButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });
};

export default useSignUpPage1Styles;
