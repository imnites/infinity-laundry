import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Button,
  ModalPopUp,
  TextWithLine,
} from '../../../components/common/components';
import {useAuthenticateUser, useLoginHandlers} from './hooks';
import {TextInput} from 'react-native-paper';
import {useMeContext} from '../../../../wrapper/Me';

interface LoginPageProps {
  navigation: any;
}

const LoginPage: React.FC<LoginPageProps> = ({navigation}) => {
  const styles = useStyles();
  const {authenticateUser, loading} = useAuthenticateUser();
  const {user} = useMeContext();

  console.log(user);

  const {
    credential,
    showPassword,
    isInvalidCredentials,
    setInvalidCredentials,
    toggleShowPassword,
    onUserNameChange,
    onPasswordChange,
    onSubmit,
    onSignUp,
  } = useLoginHandlers({
    authenticateUser,
    navigation,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infinity Laundry</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        value={credential.userName}
        onChangeText={onUserNameChange}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={credential.password}
          onChangeText={onPasswordChange}
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
        name="Login"
        onPress={onSubmit}
        loading={loading}
        disabled={loading}
        classes={{
          button: styles.loginButton,
          buttonText: styles.loginButtonText,
        }}
      />
      <Button
        name="Forgot Password?"
        onPress={() => {
          navigation.navigate('ForgotPasswordPage');
        }}
        classes={{
          button: styles.forgotButton,
          buttonText: styles.forgotButtonText,
        }}
      />
      <TextWithLine text="or" />
      <Text>
        <Text style={styles.noAccount}>Don't have an account? </Text>
        <Button
          name="Sign up."
          onPress={onSignUp}
          classes={{
            button: styles.signUpButton,
            buttonText: styles.signUpButtonText,
          }}
        />
      </Text>
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
      backgroundColor: 'transparent',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
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
      height: 40,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    loginButton: {
      width: '80%',
      backgroundColor: '#3930d8',
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
      color: '#3930d8',
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });
};
