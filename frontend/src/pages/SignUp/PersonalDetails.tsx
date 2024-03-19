import React from 'react';
import {View, Text} from 'react-native';
import {Title, TextInput, Button} from 'react-native-paper';
import {usePersonalDetailsStyles, usePersonalDetailsHandlers} from './hooks';
import {useCreateUserDraft} from '~/hooks';

const PersonalDetails: React.FC = ({navigation}: any) => {
  const styles = usePersonalDetailsStyles();

  const {createUserDraft, loading} = useCreateUserDraft();
  const {values, errors, handleChange, handleSubmit} =
    usePersonalDetailsHandlers({
      navigation,
      createUserDraft
    });

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Personal Details</Title>
      <TextInput
        placeholder="First Name"
        value={values.firstName}
        onChangeText={text => handleChange('firstName', text)}
        style={styles.input}
        maxLength={15}
        theme={{
          colors: {primary: '#3930d8'}
        }}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
      <TextInput
        placeholder="Last Name"
        value={values.lastName}
        onChangeText={text => handleChange('lastName', text)}
        style={styles.input}
        maxLength={15}
        theme={{
          colors: {primary: '#3930d8'}
        }}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={values.email}
        onChangeText={text => handleChange('email', text)}
        style={styles.input}
        maxLength={30}
        theme={{
          colors: {primary: '#3930d8'}
        }}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={values.phoneNumber}
        onChangeText={text => handleChange('phoneNumber', text)}
        style={styles.input}
        maxLength={10}
        theme={{
          colors: {primary: '#3930d8'}
        }}
      />
      {errors.phoneNumber && (
        <Text style={styles.error}>{errors.phoneNumber}</Text>
      )}
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.continueButton}
        labelStyle={styles.continueButtonText}>
        {loading ? '' : 'Continue'}
      </Button>
    </View>
  );
};

export default PersonalDetails;
