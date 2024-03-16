import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  ModalPopUp,
  TextWithLine,
} from '../../../components/common/components';
import Icon from 'react-native-vector-icons/Entypo';
import {useAuthenticateUser, useLoginHandlers} from './hooks';

interface LoginPageProps {
  navigation: any;
}

const LoginPage: React.FC<LoginPageProps> = ({navigation}) => {
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
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.iconContainer}>
          <Icon
            name={showPassword ? 'eye-with-line' : 'eye'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>
      <Button
        name="Login"
        onPress={onSubmit}
        loading={loading}
        classes={buttonStyles}
      />
      <Button
        name="Forgot Password?"
        onPress={onSignUp}
        classes={forgotPasswordStyles}
      />
      <TextWithLine text="or" />
      <Text>
        <Text style={styles.noAccount}>Don't have an account? </Text>
        <Button name="Sign up." onPress={onSignUp} classes={signUpStyles} />
      </Text>
      <ModalPopUp
        message="Invalid Credentials."
        isInvalidCredentials={isInvalidCredentials}
        setInvalidCredentials={setInvalidCredentials}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

const buttonStyles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

const signUpStyles = StyleSheet.create({
  button: {},
  buttonText: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

const forgotPasswordStyles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    paddingTop: 5,
    paddingRight: 38,
  },
  buttonText: {
    color: 'red',
  },
});

export default LoginPage;
