import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Title from '../../../components/common/components/Title';
import {usePersonalDetailsStyles, usePersonalDetailsHandlers} from './hooks';
import Button from '../../../components/common/components/Button';
import {useCreateUserDraft} from '../../../components/common/hooks/users';

interface PersonalDetailsProps {
  navigation: any;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({navigation}) => {
  const styles = usePersonalDetailsStyles();
  const {createUserDraft, loading} = useCreateUserDraft();
  const {values, errors, handleChange, handleSubmit} =
    usePersonalDetailsHandlers({
      navigation,
      createUserDraft,
    });

  return (
    <View style={styles.container}>
      <Title title="Personal Details" />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={values.firstName}
        onChangeText={text => handleChange('firstName', text)}
      />
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={values.lastName}
        onChangeText={text => handleChange('lastName', text)}
      />
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={values.email}
        onChangeText={text => handleChange('email', text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={values.phoneNumber}
        onChangeText={text => handleChange('phoneNumber', text)}
      />
      {errors.phoneNumber && (
        <Text style={styles.error}>{errors.phoneNumber}</Text>
      )}
      <Button
        name="Continue"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        classes={{
          button: styles.continueButton,
          buttonText: styles.continueButtonText,
        }}
      />
    </View>
  );
};

export default PersonalDetails;
