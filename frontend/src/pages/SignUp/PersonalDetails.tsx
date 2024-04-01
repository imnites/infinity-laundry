import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title, TextInput} from 'react-native-paper';
import {usePersonalDetailsHandlers} from './hooks';
import {useCreateUserDraft} from '~/hooks';
import {Button} from '~/components/common';

const PersonalDetails: React.FC = () => {
  const styles = useStyles();

  const {createUserDraft, loading} = useCreateUserDraft();
  const {values, errors, handleChange, handleSubmit, handleBackButton} =
    usePersonalDetailsHandlers(createUserDraft);

  return (
    <>
      <View style={styles.content}>
        <Title style={styles.titleText}>New Account</Title>
        <TextInput
          placeholder="First Name"
          value={values.firstName}
          onChangeText={text => handleChange('firstName', text)}
          style={styles.input}
          maxLength={15}
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName}</Text>
        )}
        <TextInput
          placeholder="Last Name"
          value={values.lastName}
          onChangeText={text => handleChange('lastName', text)}
          style={styles.input}
          maxLength={15}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={values.email}
          onChangeText={text => handleChange('email', text)}
          style={styles.input}
          maxLength={30}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={values.phoneNumber}
          onChangeText={text => handleChange('phoneNumber', text)}
          style={styles.input}
          maxLength={10}
        />
        {errors.phoneNumber && (
          <Text style={styles.error}>{errors.phoneNumber}</Text>
        )}
        <Button
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          classes={{
            button: styles.continueButton,
            buttonText: styles.continueButtonText
          }}>
          Continue
        </Button>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>Already have an account?</Text>
          <Button
            onPress={handleBackButton}
            classes={{
              button: styles.signUpButton,
              buttonText: styles.signUpButtonText
            }}>
            Sign in
          </Button>
        </View>
      </View>
    </>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    content: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    titleText: {
      color: '#3930d8',
      marginLeft: -140,
      fontSize: 24,
      marginBottom: 10
    },
    descriptionContainer: {
      flexDirection: 'row',
      marginTop: 20
    },
    description: {
      textAlign: 'center'
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
    error: {
      color: 'red',
      marginBottom: 10,
      marginTop: -10,
      alignSelf: 'flex-start',
      marginLeft: 35
    },
    continueButton: {
      width: '80%',
      backgroundColor: '#3930d8',
      padding: 10,
      borderRadius: 5
    },
    continueButtonText: {
      color: 'white',
      textAlign: 'center'
    },
    signUpButton: {
      marginLeft: 5
    },
    signUpButtonText: {
      color: '#3930d8',
      textDecorationLine: 'underline'
    }
  });
};

export default PersonalDetails;
