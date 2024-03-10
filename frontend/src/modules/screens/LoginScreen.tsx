import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../components/common/Button';
import ModalPopUp from '../components/common/ModalPopUp';
import TextWithLine from '../components/common/TextWithLine';
import ClickableTextButton from '../components/common/ClickableTextButton';
import useAuthenticateUser from './hooks/useAuthenticateUser';
import useLoginHandlers from './hooks/useLoginHandlers';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {authenticateUser, loading} = useAuthenticateUser();
  const [credential, setCredential] = useState<{
    userName: string;
    password: string;
  }>({
    userName: '',
    password: '',
  });
  const [isInvalidCredentials, setInvalidCredentials] = useState(false);

  const {onUserNameChange, onPasswordChange, onSubmit, onSignUp} =
    useLoginHandlers({
      authenticateUser,
      credential,
      setInvalidCredentials,
      setCredential,
      navigation,
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infinity Laundry</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={credential.userName}
        onChangeText={onUserNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={credential.password}
        onChangeText={onPasswordChange}
      />
      <Button name="Login" onPress={onSubmit} loading={loading} />
      <TextWithLine text="or" />
      <Text>
        <Text style={styles.noAccount}>Don't have an account? </Text>
        <ClickableTextButton text="Sign up." onPress={onSignUp} />
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
});

export default LoginScreen;
