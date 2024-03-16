import {useState} from 'react';
import {formattedSignUpInput} from '../../../../utils/signUpUtil';

interface FormStatePropsType {
  navigation: any;
  createUserDraft: any;
}

interface ValidateFormPropTypes {
  values: any;
  setErrors: any;
}

const validateForm = ({values, setErrors}: ValidateFormPropTypes) => {
  const newErrors: any = {};
  let hasErrors = false;

  if (!values.firstName.trim()) {
    newErrors.firstName = 'First Name is required';
    hasErrors = true;
  }

  if (!values.lastName.trim()) {
    newErrors.lastName = 'Last Name is required';
    hasErrors = true;
  }

  if (!values.email.trim()) {
    newErrors.email = 'Email is required';
    hasErrors = true;
  } else if (!/\S+@\S+\.\S+/.test(values.email.trim())) {
    newErrors.email = 'Invalid email';
    hasErrors = true;
  }

  if (!values.phoneNumber.trim()) {
    newErrors.phoneNumber = 'Phone Number is required';
    hasErrors = true;
  } else if (!/^\d{10}$/.test(values.phoneNumber.trim())) {
    newErrors.phoneNumber = 'Invalid phone number';
    hasErrors = true;
  }

  setErrors(newErrors);
  return hasErrors;
};

const useSignUpPage1Handlers = ({
  navigation,
  createUserDraft,
}: FormStatePropsType) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const handleSubmit = async () => {
    const hasErrors = validateForm({values, setErrors});

    if (!hasErrors) {
      const token = await createUserDraft({
        input: formattedSignUpInput(values),
      });
      navigation.navigate('SignUpPage2', {formData: values, token});
    }
  };

  const handleChange = (field: string, value: string) => {
    setValues({...values, [field]: value});
    setErrors({...errors, [field]: ''});
  };
  return {values, errors, handleChange, handleSubmit};
};

export default useSignUpPage1Handlers;
