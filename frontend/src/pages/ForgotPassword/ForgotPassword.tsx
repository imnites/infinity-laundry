import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from '~/components/common';
import {useForgotPasswordPageHandlers} from './hooks';
import {Provider as PaperProvider, Title, TextInput} from 'react-native-paper';

interface ForgotPasswordPageProps {
  navigation: any;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  navigation
}) => {
  const {values, onUserNameChange, handleSubmit} =
    useForgotPasswordPageHandlers({
      navigation
    });

  const styles = useStyles();
  return (
    <PaperProvider>
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
    </PaperProvider>
  );
};

export default ForgotPasswordPage;

const useStyles = () => {
  return StyleSheet.create({
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
