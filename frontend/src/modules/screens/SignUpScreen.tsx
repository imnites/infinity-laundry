import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import Title from '../components/common/Title';
import SignUpContent from './components/SignUp/SignUpContent';
import useFormState from './hooks/useFormState';
import usePutUser from './hooks/usePutUser';

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const {putUser} = usePutUser();
  const {initialValues, validationSchema, onSubmit} = useFormState({
    navigation,
    putUser,
  });
  return (
    <View style={styles.container}>
      <Title title="Sign Up" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={values => onSubmit(values)}>
        <SignUpContent />
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});

export default SignUpScreen;
