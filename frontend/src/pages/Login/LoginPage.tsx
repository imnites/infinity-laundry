import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ModalPopUp, TextWithLine} from '~/components/common';
import {useAuthenticateUser, useLoginHandlers} from './hooks';
import {Title, Button, TextInput} from 'react-native-paper';

interface LoginPageProps {
  navigation: any;
}

const LoginPage: React.FC<LoginPageProps> = ({navigation}) => {
  const styles = useStyles();
  const {authenticateUser, loading} = useAuthenticateUser();

  const {
    credential,
    showPassword,
    isInvalidCredentials,
    setInvalidCredentials,
    toggleShowPassword,
    onUserNameChange,
    onPasswordChange,
    onSubmit,
    onSignUp
  } = useLoginHandlers({
    authenticateUser,
    navigation
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
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
      </View>
      <Button
        mode="contained"
        onPress={onSubmit}
        loading={loading}
        disabled={loading}
        style={styles.continueButton}
        labelStyle={styles.continueButtonText}>
        {loading ? '' : 'Login'}
      </Button>
      <Button
        onPress={() => {
          navigation.navigate('ForgotPasswordPage');
        }}
        style={styles.forgotButton}
        labelStyle={styles.forgotButtonText}>
        Forgot Password?
      </Button>
      <TextWithLine text="or" />
      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccount}>Don't have an account? </Text>
        <Button
          onPress={onSignUp}
          style={styles.signUpButton}
          labelStyle={styles.signUpButtonText}>
          Sign up
        </Button>
      </View>
      <ModalPopUp
        message="Invalid Credentials."
        isInvalidCredentials={isInvalidCredentials}
        setInvalidCredentials={setInvalidCredentials}
      />
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
      marginTop: 20,
      marginBottom: 10,
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
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10
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
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10
    },
    inputText: {
      flex: 1,
      height: 40,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5
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
    signUpButton: {
      marginTop: -10
    },
    signUpButtonText: {
      color: '#3930d8',
      textDecorationLine: 'underline'
    },
    continueButton: {
      width: '80%',
      backgroundColor: '#3930d8',
      borderRadius: 5
    },
    continueButtonText: {
      color: 'white',
      textAlign: 'center'
    },
    noAccountContainer: {
      flexDirection: 'row'
    }
  });
};
