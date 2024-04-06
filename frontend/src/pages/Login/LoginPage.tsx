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
          placeholder="Email or Phone"
          value={credential.userName}
          onChangeText={onUserNameChange}
          fullWidth
          maxLength={255}
        />
      </View>
      <View style={styles.fieldContainer}>
        <TextField
          placeholder="Password"
          value={credential.password}
          onChangeText={onPasswordChange}
          secureTextEntry
          fullWidth
          showEyeIcon
          maxLength={16}
        />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Button
          classes={{button: styles.forgotPasswordButton}}
          onPress={handleForgotPassword}>
          Forgot Password?
        </Button>
      </View>
      <View style={styles.loginButtonContainer}>
        <Button
          variant="contained"
          fullWidth
          onPress={onSubmit}
          loading={loading}
          disabled={loading}>
          Login
        </Button>
      </View>
      <TextWithLine text="or" />
      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccount}>Don't have an account? </Text>
        <Button onPress={onSignUp}>Sign Up</Button>
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
      padding: 32,
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
    or: {
      marginVertical: 10
    },
    text: {
      marginHorizontal: 10,
      color: 'black',
      fontWeight: 'bold'
    },
    noAccountContainer: {
      display: 'flex',
      flexDirection: 'row'
    },
    fieldContainer: {
      marginTop: 8,
      marginBottom: 8,
      width: '100%'
    },
    loginButtonContainer: {
      marginTop: 32,
      marginBottom: 16,
      width: '100%'
    },
    forgotPasswordContainer: {
      width: '100%'
    },
    forgotPasswordButton: {
      marginLeft: 'auto'
    }
  });
};
