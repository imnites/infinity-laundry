import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import {usePersonalDetailsHandlers} from './hooks';
import {useCreateUserDraft} from '~/hooks';
import {Button} from '~/components/common';
import {TextField} from '~/components/common';

const PersonalDetails: React.FC = () => {
  const styles = useStyles();

  const {createUserDraft, loading} = useCreateUserDraft();
  const {values, errors, handleChange, handleSubmit, handleBackButton} =
    usePersonalDetailsHandlers(createUserDraft);

  return (
    <View style={styles.content}>
      <Title style={styles.titleText}>New Account</Title>
      <View style={styles.fieldContainer}>
        <TextField
          placeholder="First Name"
          value={values.firstName}
          onChangeText={text => handleChange('firstName', text)}
          maxLength={255}
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName}</Text>
        )}
      </View>
      <View style={styles.fieldContainer}>
        <TextField
          placeholder="Last Name"
          value={values.lastName}
          onChangeText={text => handleChange('lastName', text)}
          maxLength={255}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
      </View>
      <View style={styles.fieldContainer}>
        <TextField
          placeholder="Email"
          keyboardType="email-address"
          value={values.email}
          onChangeText={text => handleChange('email', text)}
          maxLength={255}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>
      <View style={styles.fieldContainer}>
        <TextField
          placeholder="10 digit Phone Number"
          keyboardType="phone-pad"
          value={values.phoneNumber}
          onChangeText={text => handleChange('phoneNumber', text)}
          maxLength={10}
        />
        {errors.phoneNumber && (
          <Text style={styles.error}>{errors.phoneNumber}</Text>
        )}
      </View>
      <View style={styles.continueButtonContainer}>
        <Button
          variant="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}>
          Continue
        </Button>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>Already have an account?</Text>
        <Button onPress={handleBackButton}>Sign in</Button>
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '100%',
      padding: 32
    },
    continueButtonContainer: {
      width: '100%',
      marginTop: 32,
      marginBottom: 4
    },
    fieldContainer: {
      width: '100%',
      marginTop: 4,
      marginBottom: 4
    },
    titleText: {
      color: '#3930d8',
      fontSize: 24,
      marginBottom: 10
    },
    descriptionContainer: {
      flexDirection: 'row',
      marginTop: 20
    },
    description: {
      textAlign: 'center',
      paddingRight: 8
    },
    error: {
      color: 'red',
      marginBottom: 10,
      marginTop: -10,
      alignSelf: 'flex-start',
      marginLeft: 35
    }
  });
};

export default PersonalDetails;
