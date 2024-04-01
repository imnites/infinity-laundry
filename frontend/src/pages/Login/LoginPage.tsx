import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextWithLine, Button} from '~/components/common';
import {useAuthenticateUser, useLoginHandlers} from './hooks';
import {Title, TextInput} from 'react-native-paper';

const LoginPage = () => {
  const styles = useStyles();
  const {authenticateUser, loading} = useAuthenticateUser();

  const {
    credential,
    showPassword,
    toggleShowPassword,
    onUserNameChange,
    onPasswordChange,
    onSubmit,
    onSignUp,
    handleForgotPassword
  } = useLoginHandlers({
    authenticateUser
  });

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Infinity Laundry</Title>
      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={credential.userName}
        onChangeText={onUserNameChange}
        maxLength={255}
        theme={{
          colors: {primary: '#3930d8'}
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={credential.password}
        onChangeText={onPasswordChange}
        maxLength={25}
        theme={{
          colors: {primary: '#3930d8'}
        }}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={toggleShowPassword}
            color="#999"
          />
        }
      />
      <Button
        onPress={onSubmit}
        loading={loading}
        disabled={loading}
        classes={{
          button: styles.loginButton,
          buttonText: styles.loginButtonText
        }}>
        Login
      </Button>
      <Button
        onPress={handleForgotPassword}
        classes={{
          button: styles.forgotButton,
          buttonText: styles.forgotButtonText
        }}>
        Forgot Password?
      </Button>
      <TextWithLine text="or" />
      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccount}>Don't have an account? </Text>
        <Button
          onPress={onSignUp}
          classes={{
            button: styles.signUpButton,
            buttonText: styles.signUpButtonText
          }}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default LoginPage;

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
      marginBottom: 30,
      fontSize: 24
    },
    noAccount: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    input: {
      width: '80%',
      backgroundColor: 'transparent',
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#3930d8',
      margin: 0,
      marginBottom: 10,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      paddingHorizontal: 0
    },
    or: {
      marginVertical: 10
    },
    button: {
      width: '80%'
    },
    container1: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: 'black'
    },
    text: {
      marginHorizontal: 10,
      color: 'black',
      fontWeight: 'bold'
    },
    loginButton: {
      width: '80%',
      backgroundColor: '#3930d8',
      padding: 10,
      borderRadius: 5
    },
    loginButtonText: {
      color: 'white',
      textAlign: 'center'
    },
    forgotButton: {
      alignSelf: 'flex-end',
      paddingRight: 38
    },
    forgotButtonText: {
      color: 'red'
    },
    signUpButton: {},
    signUpButtonText: {
      color: '#3930d8',
      textDecorationLine: 'underline'
    },
    noAccountContainer: {
      flexDirection: 'row'
    }
  });
};
