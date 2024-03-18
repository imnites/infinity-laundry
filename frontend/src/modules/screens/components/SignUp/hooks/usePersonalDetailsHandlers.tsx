import {useState, useCallback} from 'react';
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
      console.log('coming');
      console.log('userId');
      console.log('accessToken');
      const headers = {authorization: `Basic ${accessToken}`};
      await saveUserDraft({draftId: userId}, headers);
    },
    [saveUserDraft],
  );

  const handleSubmit = async () => {
    const hasErrors = validateForm({values, setErrors});

    if (!hasErrors) {
      const token = await createUserDraft({
        input: formattedSignUpInput(values),
      });
      await generatePhoneOTP({
        otpInput: {
          id: token,
        },
      });
      navigation.navigate('PhoneVerification', {
        link: 'ResetPassword',
        otpInput: values.phoneNumber,
        userId: token,
        onCallbackFunction: onCallbackFunction,
      });
    }
  };
  return {values, errors, handleChange, handleSubmit};
};

export default usePersonalDetailsHandlers;
