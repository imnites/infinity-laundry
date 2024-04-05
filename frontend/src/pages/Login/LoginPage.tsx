import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, TextField, TextWithLine} from '~/components/common';
import {useAuthenticateUser, useLoginHandlers} from './hooks';
import {Title} from 'react-native-paper';

const LoginPage = () => {
  const styles = useStyles();
  const {authenticateUser, loading} = useAuthenticateUser();

  const {
    credential,
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
      <View style={styles.fieldContainer}>
        <TextField
          inputStyle={styles.input}
          placeholder="Email or Phone"
          value={credential.userName}
          onChangeText={onUserNameChange}
          fullWidth
          variant="underline"
        />
      </View>
      <View style={styles.fieldContainer}>
        <TextField
          inputStyle={styles.input}
          placeholder="Password"
          value={credential.password}
          onChangeText={onPasswordChange}
          secureTextEntry
          fullWidth
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Button
          onPress={handleForgotPassword}
          classes={{
            button: styles.forgotButton,
            buttonText: styles.forgotButtonText
          }}>
          Forgot Password?
        </Button>
      </View>
      <View style={styles.fieldContainer}>
        <Button
          fullWidth
          onPress={onSubmit}
          loading={loading}
          disabled={loading}
          classes={{
            button: styles.loginButton,
            buttonText: styles.loginButtonText
          }}>
          Login
        </Button>
      </View>
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
      // width: '80%',
      // backgroundColor: 'transparent',
      // height: 40,
      // borderBottomWidth: 1,
      // borderBottomColor: '#3930d8',
      // margin: 0,
      // marginBottom: 10,
      // borderTopWidth: 0,
      // borderLeftWidth: 0,
      // borderRightWidth: 0,
      // paddingHorizontal: 0
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
      backgroundColor: '#3930d8',
      padding: 10,
      borderRadius: 16,
      marginTop: 16
    },
    loginButtonText: {
      color: 'white',
      textAlign: 'center'
    },
    forgotButton: {
      alignSelf: 'flex-end'
    },
    forgotButtonText: {
      color: '#3930d8'
    },
    signUpButton: {},
    signUpButtonText: {
      color: '#3930d8',
      textDecorationLine: 'underline'
    },
    noAccountContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    fieldContainer: {
      width: '85%',
      marginTop: 8,
      marginBottom: 8
    },
    forgotPasswordContainer: {
      width: '85%'
    }
  });
};
