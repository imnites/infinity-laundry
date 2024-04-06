import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from '~/components/common';
import {useForgotPasswordPageHandlers} from './hooks';
import {Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TextField} from '~/components/common';

const ForgotPasswordPage: React.FC = () => {
  const navigation = useNavigation();
  const {values, onUserNameChange, handleSubmit} =
    useForgotPasswordPageHandlers({
      navigation
    });

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Forgot Password</Title>
      <Text style={styles.description}>
        Enter the email address or phone number associated with your account.
      </Text>
      <View style={styles.fieldContainer}>
        <TextField
          fullWidth
          variant="underline"
          placeholder="Email or Phone"
          onChangeText={onUserNameChange}
          value={values.userName}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Button fullWidth onPress={handleSubmit} variant="contained">
          Continue
        </Button>
      </View>
      <View style={styles.fieldContainer}>
        <Button
          onPress={() => {
            (navigation.navigate as any)('LoginPage');
          }}
          leftIcon={<Icon name="arrow-left" size={16} color="#3930d8" />}>
          Back to Login
        </Button>
      </View>
    </View>
  );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#ffffff'
  },
  titleText: {
    color: '#3930d8',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'left'
  },
  fieldContainer: {width: '100%', marginTop: 16, marginBottom: 16},
  description: {
    textAlign: 'center',
    marginBottom: 8
  }
});
