import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '~/components/common';
import {useForgotPasswordPageHandlers} from './hooks';
import {Title, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import BackButton from '~/components/common/BackButton';

const ForgotPasswordPage: React.FC = () => {
  const navigation = useNavigation();
  const {values, onUserNameChange, handleSubmit} =
    useForgotPasswordPageHandlers({
      navigation
    });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const styles = useStyles();
  return (
    <>
      <View style={styles.backButton}>
        <BackButton size={35} handleBackPress={handleBackPress} />
      </View>
      <View style={styles.container}>
        <Title style={styles.titleText}>Account Recovery</Title>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone"
          onChangeText={onUserNameChange}
          value={values.userName}
        />
        <Button
          name="Next"
          onPress={handleSubmit}
          classes={{
            button: styles.submitButton,
            buttonText: styles.submitButtonText
          }}
        />
      </View>
    </>
  );
};

export default ForgotPasswordPage;

const useStyles = () => {
  return StyleSheet.create({
    backButton: {
      padding: 20,
      backgroundColor: '#fff'
    },
    container: {
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
      backgroundColor: 'transparent',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10
    },
    error: {
      color: 'red',
      alignSelf: 'flex-start',
      position: 'relative',
      left: 20,
      top: -10
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
    }
  });
};
