import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {formattedSignUpInput} from '../../../../utils/signUpUtil';
import {
  useGeneratePhoneOTP,
  useSaveUserDraft,
} from '../../../../components/common/hooks/users';

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

const usePersonalDetailsHandlers = ({
  navigation,
  createUserDraft,
}: FormStatePropsType) => {
  const {generatePhoneOTP} = useGeneratePhoneOTP();
  const {saveUserDraft} = useSaveUserDraft();
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

  const handleChange = (field: string, value: string) => {
    setValues({...values, [field]: value});
    setErrors({...errors, [field]: ''});
  };

  const onCallbackFunction = useCallback(
    async ({userId, accessToken}: any) => {
      const headers = {authorization: `Basic ${accessToken}`};
      await saveUserDraft({draftId: userId}, headers);
    },
    [saveUserDraft],
  );

  const handleSubmit = async () => {
    if (validateForm({values, setErrors})) {
      return;
    }

    const token = await createUserDraft({
      input: formattedSignUpInput(values),
    });

    try {
      const {success, verificationToken} = await generatePhoneOTP({
        otpInput: {
          id: token,
        },
      });
      if (success) {
        navigation.navigate('PhoneVerification', {
          parent: 'signUp',
          link: 'ResetPassword',
          contact: values.phoneNumber,
          token: verificationToken,
          onCallbackFunction: onCallbackFunction,
        });
      }
    } catch (error) {
      Alert.alert(
        'Account Not Found',
        'This account does not exist. Please sign up.',
      );
    }
  };
  return {values, errors, handleChange, handleSubmit};
};

export default usePersonalDetailsHandlers;
