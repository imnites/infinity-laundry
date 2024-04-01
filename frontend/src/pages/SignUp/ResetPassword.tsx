import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from '~/components/common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TextInput,
  DefaultTheme,
  Title,
  Button as ReactNativePaperButton
} from 'react-native-paper';
import useResetPassword from './hooks/useResetPassword';

interface ResetPasswordPropsType {
  route: any;
}

const ResetPassword: React.FC<ResetPasswordPropsType> = ({
  route
}: ResetPasswordPropsType) => {
  const {
    formValues,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    handleBackButton
  } = useResetPassword(route);

  return (
    <>
      <View style={styles.content}>
        <Title style={styles.titleText}>Set new password?</Title>
        <Text style={styles.description}>Must be at least 8 characters.</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={formValues.password}
          maxLength={15}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={handleConfirmPasswordChange}
          value={formValues.confirmPassword}
          maxLength={15}
        />
        <View style={styles.tabsContainer}>
          <ReactNativePaperButton
            style={[
              styles.tab,
              formValues.strength === 'Weak' && {
                backgroundColor: theme.colors.weak
              }
            ]}
            labelStyle={styles.tabLabel}>
            Weak
          </ReactNativePaperButton>
          <ReactNativePaperButton
            style={[
              styles.tab,
              formValues.strength === 'Medium' && {
                backgroundColor: theme.colors.medium
              }
            ]}
            labelStyle={styles.tabLabel}>
            Medium
          </ReactNativePaperButton>
          <ReactNativePaperButton
            style={[
              styles.tab,
              formValues.strength === 'Strong' && {
                backgroundColor: theme.colors.success
              }
            ]}
            labelStyle={styles.tabLabel}>
            Strong
          </ReactNativePaperButton>
        </View>
        <Button
          onPress={handleSubmit}
          loading={formValues.isSubmitting}
          disabled={formValues.isSubmitting}
          classes={{
            button: styles.submitButton,
            buttonText: styles.submitButtonText
          }}>
          Reset Password
        </Button>
        <Button
          onPress={handleBackButton}
          classes={{
            button: styles.backToLoginButton,
            buttonText: styles.backToLoginButtonText
          }}
          icon={<Icon name="arrow-left" size={16} color="#3930d8" />}>
          Back to Login
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 20,
    backgroundColor: '#fff'
  },
  content: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  titleText: {
    color: '#3930d8',
    marginLeft: -70,
    fontSize: 24,
    marginBottom: 10
  },
  description: {
    marginLeft: -95,
    marginBottom: 20
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
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  tab: {
    marginHorizontal: 5
  },
  tabLabel: {
    color: 'black'
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginVertical: 5
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
    width: '100%',
    padding: 10
  },
  backToLoginButtonText: {
    color: '#3930d8',
    textAlign: 'center'
  }
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    success: '#32CD32',
    medium: '#FFA500',
    weak: '#FF0000'
  }
};

export default ResetPassword;
