import {StyleSheet} from 'react-native';

const useStyles = () => {
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
    },
    submitButton: {
      width: '100%',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    submitButtonText: {
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
    updatePasswordButton: {
      width: '100%',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    updatePasswordButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });
};

export default useStyles;
