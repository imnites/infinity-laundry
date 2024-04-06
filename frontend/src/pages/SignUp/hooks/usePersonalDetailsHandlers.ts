import {useState, useCallback} from 'react';
import {isValidEmail, isValidPhoneNumber, mapToSignUpInput} from '~/utils';
import {useGeneratePhoneOTP, useSaveUserDraft} from '~/hooks';
import {useNavigation} from '@react-navigation/native';

interface ValidateFormPropTypes {
  values: any;
  setErrors: any;
}

const validateForm = ({values, setErrors}: ValidateFormPropTypes) => {
  const newErrors: any = {};
  let hasErrors = false;

  if (!values.firstName) {
    newErrors.firstName = 'First Name is required';
    hasErrors = true;
  }

  if (!values.lastName) {
    newErrors.lastName = 'Last Name is required';
    hasErrors = true;
  }

  if (!values.email) {
    newErrors.email = 'Email is required';
    hasErrors = true;
  } else if (!isValidEmail(values.email)) {
    newErrors.email = 'Invalid email';
    hasErrors = true;
  }

  if (!values.phoneNumber) {
    newErrors.phoneNumber = 'Phone Number is required';
    hasErrors = true;
  } else if (!isValidPhoneNumber(values.phoneNumber)) {
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
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
  }>({
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

    try {
      const token = await createUserDraft({
        input: mapToSignUpInput(values)
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
    } catch (err: any) {
      const errorCode =
        err?.graphQLErrors && err?.graphQLErrors[0]?.extensions?.code;

      switch (errorCode as string) {
        case 'EMAIL_AND_PHONE_NUMBER_ALREADY_EXISTS':
          setErrors({
            email: 'Email already exists.',
            phoneNumber: 'Phone number already exists.'
          });
          break;

        case 'EMAIL_ALREADY_EXISTS':
          setErrors({email: 'Email already exists.'});
          break;

        case 'PHONE_NUMBER_ALREADY_EXISTS':
          setErrors({phoneNumber: 'Phone number already exists.'});
          break;
      }

      return;
    }
  };

  const handleBackButton = useCallback(
    () => (navigation.navigate as any)('LoginPage'),
    [navigation.navigate]
  );

  return {values, errors, handleChange, handleSubmit, handleBackButton};
};

export default usePersonalDetailsHandlers;
