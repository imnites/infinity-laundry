import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from '~/components/common';
import {useForgotPasswordPageHandlers} from './hooks';
import {Title, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ForgotPasswordPage: React.FC = () => {
  const navigation = useNavigation();
  const {values, onUserNameChange, handleSubmit} =
    useForgotPasswordPageHandlers({
      navigation
    });

  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Forgot Password?</Title>
      <Text style={styles.description}>
        No worries, we'll send you reset instructions
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Phone"
        onChangeText={onUserNameChange}
        value={values.userName}
      />
      <Button
        onPress={handleSubmit}
        classes={{
          button: styles.submitButton,
          buttonText: styles.submitButtonText
        }}>
        Continue
      </Button>
      <Button
        onPress={() => {
          (navigation.navigate as any)('LoginPage');
        }}
        classes={{
          button: styles.backToLoginButton,
          buttonText: styles.backToLoginButtonText
        }}
        leftIcon={<Icon name="arrow-left" size={16} color="#3930d8" />}>
        Back to Login
      </Button>
    </View>
  );
};

export default ForgotPasswordPage;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white'
    },
    titleText: {
      color: '#3930d8',
      marginLeft: -85,
      fontSize: 24,
      marginBottom: 10
    },
    description: {
      textAlign: 'center',
      marginBottom: 20,
      marginLeft: -10
    },
    input: {
      width: '80%',
      backgroundColor: 'transparent',
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#3930d8',
      margin: 0,
      marginBottom: 10,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      paddingHorizontal: 0
    },
    submitButton: {
      width: '80%',
      backgroundColor: '#3930d8',
      padding: 10,
      borderRadius: 5
    },
    submitButtonText: {
      color: 'white',
      textAlign: 'center'
    },
    backToLoginButton: {
      width: '80%',
      padding: 10
    },
    backToLoginButtonText: {
      color: '#3930d8',
      textAlign: 'center'
    }
  });
};
