import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Title from '../../../components/common/components/Title';
import {useSignUpPageHandlers} from './hooks';
import Button from '../../../components/common/components/Button';
import {useCreateUserDraft} from '../../../components/common/hooks/users';

interface SignUpPage1Props {
  navigation: any;
}

const SignUpPage1: React.FC<SignUpPage1Props> = ({navigation}) => {
  const {createUserDraft, loading} = useCreateUserDraft();
  const {values, errors, handleChange, handleSubmit} = useSignUpPageHandlers({
    navigation,
    createUserDraft,
  });

  return (
    <View style={styles.container}>
      <Title title="Sign Up" />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={values.firstName}
        onChangeText={text => handleChange('firstName', text)}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={values.lastName}
        onChangeText={text => handleChange('lastName', text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={values.email}
        onChangeText={text => handleChange('email', text)}
      />
      {errors.phoneNumber && (
        <Text style={styles.error}>{errors.phoneNumber}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={values.phoneNumber}
        onChangeText={text => handleChange('phoneNumber', text)}
      />
      <Button
        name="Continue"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        classes={buttonStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SignUpPage1;
