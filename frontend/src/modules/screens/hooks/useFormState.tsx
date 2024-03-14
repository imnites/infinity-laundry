import * as yup from 'yup';
import {useCallback} from 'react';
import {formattedSignUpInput} from '../../utils/signUpUtil';

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Phone number must be numeric')
    .required('Phone Number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface FormStatePropsType {
  navigation: any;
  putUser: any;
}

const useFormState = ({navigation, putUser}: FormStatePropsType) => {
  const onSubmit = useCallback(
    async (values: FormValues) => {
      const input = formattedSignUpInput(values);
      await putUser(input);
      navigation.navigate('Home Page');
    },
    [navigation, putUser],
  );
  return {initialValues, validationSchema, onSubmit};
};

export default useFormState;
