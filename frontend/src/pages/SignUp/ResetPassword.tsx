import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '~/components/common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Title} from 'react-native-paper';
import useResetPassword from './hooks/useResetPassword';
import {TextField} from '~/components/common';
import {PasswordStrengthMeter} from './PasswordStrengthMeter';
import {useMeContext} from '~/me';

interface ResetPasswordPropsType {
  route: any;
}

const ResetPassword: React.FC<ResetPasswordPropsType> = ({
  route
}: ResetPasswordPropsType) => {
  const {me} = useMeContext();
  const {
    formValues,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    handleBackButton
  } = useResetPassword(route);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Title style={styles.titleText}>New password</Title>
        <View style={styles.fieldContainer}>
          <TextField
            fullWidth
            variant="shadow"
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
            variant="shadow"
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
            variant="shadow"
            fullWidth
            onPress={handleSubmit}
            loading={formValues.isSubmitting}
            disabled={formValues.isSubmitting}>
            Update Password
          </Button>
        </View>
        {!me?.id ? (
          <View style={styles.backToLoginContainer}>
            <Button
              onPress={handleBackButton}
              leftIcon={<Icon name="arrow-left" size={16} color="#3930d8" />}>
              Back to Login
            </Button>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff'
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400
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
  },
  backToLoginContainer: {
    marginTop: 16
  }
});

export default ResetPassword;
