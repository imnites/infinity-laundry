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
    <View style={styles.root}>
      <View style={styles.container}>
        <Title style={styles.titleText}>New Account</Title>
        <View style={styles.fieldContainer}>
          <TextField
            variant="shadow"
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
            variant="shadow"
            placeholder="Last Name"
            value={values.lastName}
            onChangeText={text => handleChange('lastName', text)}
            maxLength={255}
          />
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}
        </View>
        <View style={styles.fieldContainer}>
          <TextField
            variant="shadow"
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
            variant="shadow"
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
            variant="shadow"
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
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
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
      paddingRight: 8,
      color: '#0009'
    },
    error: {
      color: 'red',
      alignSelf: 'flex-start',
      marginTop: 4
    }
  });
};

export default PersonalDetails;
