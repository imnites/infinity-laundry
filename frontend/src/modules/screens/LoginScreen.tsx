import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from '../components/common/Button';
import TextWithLine from '../components/common/TextWithLine';
import ClickableTextButton from '../components/common/ClickableTextButton';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Infinity Laundry</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button name="Login" onPress={() => navigation.navigate('Home Page')} />
      <TextWithLine text="or" />
      <Text>
        <Text style={styles.noAccount}>Don't have an account? </Text>
        <ClickableTextButton
          text="Sign up."
          onPress={() => navigation.navigate('Sign Up')}
        />
      </Text>
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
