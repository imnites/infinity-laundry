import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import {Button, Title} from '../../../components/common/components';
import {
  useSaveUserDraft,
  useUpdatePassword,
} from '../../../components/common/hooks/users';

interface SignUpPage3Props {
  navigation: any;
  route: any;
}

const SignUpPage3: React.FC<SignUpPage3Props> = ({navigation, route}) => {
  const {userId, accessToken} = route.params;
  const {saveUserDraft, loading: isSavingUserDraft} = useSaveUserDraft();
  const {updatePassword, loading: isUpdatingPassword} = useUpdatePassword();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    error: '',
  });

  const handleSubmit = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setFormData({...formData, error: "Passwords don't match"});
        return;
      }

      const headers = {authorization: `Basic ${accessToken}`};
      const isCreated = await saveUserDraft({draftId: userId}, headers);
      // Add update password logic here.
      if (isCreated) {
        Alert.alert(
          'Account Created',
          'Your account has been successfully created.',
          [{text: 'OK', onPress: () => navigation.navigate('LoginPage')}],
        );
      }
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Title title="Sign Up" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={text => setFormData({...formData, password: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={text => setFormData({...formData, confirmPassword: text})}
      />
      {formData.error ? (
        <Text style={styles.error}>{formData.error}</Text>
      ) : null}
      <Button
        name="Sign Up"
        onPress={handleSubmit}
        loading={isSavingUserDraft}
        disabled={isSavingUserDraft}
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
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SignUpPage3;
