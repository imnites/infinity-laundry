import React, {useState} from 'react';
import {Text, View, TextInput, Alert} from 'react-native';
import {Button, Title} from '../../../components/common/components';
import {
  useSaveUserDraft,
  useUpdatePassword,
} from '../../../components/common/hooks/users';
import {useSignUpPage3Styles} from './hooks';

interface SignUpPage3Props {
  navigation: any;
  route: any;
}

const SignUpPage3: React.FC<SignUpPage3Props> = ({navigation, route}) => {
  const styles = useSignUpPage3Styles();
  const {userId, accessToken} = route.params;
  const {saveUserDraft, loading: isSavingUserDraft} = useSaveUserDraft();
  const {updatePassword, loading: isResettingPassword} = useUpdatePassword();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    error: '',
  });

  const handleSubmit = async () => {
    try {
      if (formData.password.length < 8) {
        setFormData({
          ...formData,
          error: 'Password must contain at least 8 characters.',
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setFormData({...formData, error: 'Passwords do not match.'});
        return;
      }

      const headers = {authorization: `Basic ${accessToken}`};
      const userAdded = await saveUserDraft({draftId: userId}, headers);
      const passwordUpdate = await updatePassword(
        {
          password: formData.password,
        },
        headers,
      );

      if (userAdded && passwordUpdate) {
        Alert.alert(
          'Account Created',
          'Your account has been successfully created.',
          [{text: 'OK', onPress: () => navigation.navigate('LoginPage')}],
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Title title="Almost Done!" />
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
        loading={isSavingUserDraft || isResettingPassword}
        disabled={isSavingUserDraft || isResettingPassword}
        classes={{
          button: styles.submitButton,
          buttonText: styles.submitButtonText,
        }}
      />
    </View>
  );
};

export default SignUpPage3;
