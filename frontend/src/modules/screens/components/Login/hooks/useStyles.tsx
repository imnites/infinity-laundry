import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    noAccount: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      padding: 10,
    },
    or: {
      marginVertical: 10,
    },
    button: {
      width: '80%',
    },
    container1: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: 'black',
    },
    text: {
      marginHorizontal: 10,
      color: 'black',
      fontWeight: 'bold',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    inputText: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 10,
    },
    iconContainer: {
      paddingHorizontal: 10,
    },
    loginButton: {
      width: '80%',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    loginButtonText: {
      color: 'white',
      textAlign: 'center',
    },
    forgotButton: {
      alignSelf: 'flex-end',
      paddingTop: 5,
      paddingRight: 38,
    },
    forgotButtonText: {
      color: 'red',
    },
    signUpButton: {},
    signUpButtonText: {
      color: 'blue',
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });
};

export default useStyles;
