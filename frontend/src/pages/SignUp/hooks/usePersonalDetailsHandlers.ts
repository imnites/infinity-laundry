import {useState, useCallback} from 'react';
import {formattedSignUpInput} from '~/utils';
import {useGeneratePhoneOTP, useSaveUserDraft} from '~/hooks';
import {useNavigation} from '@react-navigation/native';

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

const usePersonalDetailsHandlers = (createUserDraft: any) => {
  const navigation = useNavigation();
  const {generatePhoneOTP} = useGeneratePhoneOTP();
  const {saveUserDraft} = useSaveUserDraft();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (field: string, value: string) => {
    setValues({...values, [field]: value});
    setErrors({...errors, [field]: ''});
  };

  const onSaveUserDraft = useCallback(
    async ({userId, accessToken}: any) => {
      const headers = {authorization: `Basic ${accessToken}`};
      await saveUserDraft({draftId: userId}, headers);
    },
    [saveUserDraft]
  );

  const handleSubmit = async () => {
    if (validateForm({values, setErrors})) {
      return;
    }

    const token = await createUserDraft({
      input: formattedSignUpInput(values)
    });

    const {success, verificationToken} = await generatePhoneOTP({
      otpInput: {
        id: token
      }
    });
    if (success) {
      (navigation.navigate as any)('PhoneVerification', {
        parent: 'SignUp',
        link: 'ResetPassword',
        contact: values.phoneNumber,
        verificationToken: verificationToken,
        otpInput: token,
        onSaveUserDraft: onSaveUserDraft
      });
    }
  };

  const handleBackButton = useCallback(
    () => (navigation.navigate as any)('LoginPage'),
    [navigation.navigate]
  );

  return {values, errors, handleChange, handleSubmit, handleBackButton};
};

export default usePersonalDetailsHandlers;
