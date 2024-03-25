import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, DefaultTheme, Title} from 'react-native-paper';
import useResetPassword from './hooks/useResetPassword';
import {useNavigation} from '@react-navigation/native';
import BackButton from '~/components/common/BackButton';
interface ResetPasswordPropsType {
  navigation: any;
  route: any;
}

const ResetPassword: React.FC<ResetPasswordPropsType> = ({
  route
}: ResetPasswordPropsType) => {
  const navigation = useNavigation();

  const {
    formValues,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit
  } = useResetPassword({navigation, route});

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.backButton}>
        <BackButton size={35} handleBackPress={handleBackPress} />
      </View>
      <View style={styles.content}>
        <Title style={styles.titleText}>Reset Password</Title>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={formValues.password}
          maxLength={15}
          theme={{
            colors: {primary: '#3930d8'}
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={handleConfirmPasswordChange}
          value={formValues.confirmPassword}
          maxLength={15}
          theme={{
            colors: {primary: '#3930d8'}
          }}
        />
        <View style={styles.tabsContainer}>
          <Button
            style={[
              styles.tab,
              formValues.strength === 'Weak' && {
                backgroundColor: theme.colors.weak
              }
            ]}
            labelStyle={styles.tabLabel}>
            Weak
          </Button>
          <Button
            style={[
              styles.tab,
              formValues.strength === 'Medium' && {
                backgroundColor: theme.colors.medium
              }
            ]}
            labelStyle={styles.tabLabel}>
            Medium
          </Button>
          <Button
            style={[
              styles.tab,
              formValues.strength === 'Strong' && {
                backgroundColor: theme.colors.success
              }
            ]}
            labelStyle={styles.tabLabel}>
            Strong
          </Button>
        </View>
        <Button
          style={styles.submitButton}
          labelStyle={styles.submitButtonText}
          mode="contained"
          onPress={handleSubmit}
          loading={formValues.isSubmitting}>
          Next
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
    marginTop: 20,
    marginBottom: 10,
    fontSize: 24
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10
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
    borderRadius: 5
  },
  submitButtonText: {
    color: 'white',
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
