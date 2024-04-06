import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '~/components/common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Title} from 'react-native-paper';
import useResetPassword from './hooks/useResetPassword';
import {TextField} from '~/components/common';
import {PasswordStrengthMeter} from './PasswordStrengthMeter';

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
    <View style={styles.content}>
      <Title style={styles.titleText}>New password</Title>
      <View style={styles.fieldContainer}>
        <TextField
          fullWidth
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          value={formValues.password}
          maxLength={16}
          showEyeIcon
        />
      </View>
      <View style={styles.fieldContainer}>
        <TextField
          fullWidth
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={handleConfirmPasswordChange}
          value={formValues.confirmPassword}
          maxLength={16}
          showEyeIcon
        />
      </View>
      {formValues.password ? (
        <View style={styles.fieldContainer}>
          <PasswordStrengthMeter password={formValues.password} />
        </View>
      ) : null}
      <View style={styles.updatePasswordContainer}>
        <Button
          variant="contained"
          fullWidth
          onPress={handleSubmit}
          loading={formValues.isSubmitting}
          disabled={formValues.isSubmitting}>
          Update Password
        </Button>
      </View>
      <View>
        <Button
          onPress={handleBackButton}
          leftIcon={<Icon name="arrow-left" size={16} color="#3930d8" />}>
          Back to Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff'
  },
  fieldContainer: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8
  },
  updatePasswordContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 8
  },
  titleText: {
    color: '#3930d8',
    fontSize: 24
  }
});

export default ResetPassword;
