import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {
  Button,
  ModalPopUp,
  TextWithLine,
} from '../../../components/common/components';
import Icon from 'react-native-vector-icons/Entypo';
import {useStyles, useAuthenticateUser, useLoginHandlers} from './hooks';
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
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.iconContainer}>
          <Icon
            name={showPassword ? 'eye' : 'eye-with-line'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
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
