import React from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';
import Button from '../../../components/common/Button';

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpScreen: React.FC = () => {
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    validateForm,
    isSubmitting,
  } = useFormikContext<FormValues>();

  const onSave = async () => {
    const fault = await validateForm();
    if (Object.keys(fault).length === 0) {
      handleSubmit();
    }
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={values.firstName}
        onChangeText={handleChange('firstName')}
      />
      {errors.firstName && (
        <Text style={styles.passwordError}>{errors.firstName}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={values.lastName}
        onChangeText={handleChange('lastName')}
      />
      {errors.lastName && (
        <Text style={styles.passwordError}>{errors.lastName}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={values.phoneNumber}
        onChangeText={handleChange('phoneNumber')}
      />
      {errors.phoneNumber && (
        <Text style={styles.passwordError}>{errors.phoneNumber}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={values.email}
        onChangeText={handleChange('email')}
      />
      {errors.email && <Text style={styles.passwordError}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={values.password}
        onChangeText={handleChange('password')}
      />
      {errors.password && (
        <Text style={styles.passwordError}>{errors.password}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
      />
      {errors.confirmPassword && (
        <Text style={styles.passwordError}>{errors.confirmPassword}</Text>
      )}
      <Button name="Save" onPress={onSave} loading={isSubmitting} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordError: {
    color: 'red',
  },
});

export default SignUpScreen;
