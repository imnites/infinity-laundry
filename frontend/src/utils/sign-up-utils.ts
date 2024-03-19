interface FormattedSignUpInputType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const formattedSignUpInput = (userDetails: FormattedSignUpInputType) => {
  return {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    enabled: true,
    phoneNumber: {
      countryCode: '+91',
      phoneNumber: userDetails.phoneNumber
    }
  };
};

export const isValidEmail = (value: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isValidPhoneNumber = (value: any) => {
  const phoneRegex = /^[+]?[0-9]{10,}$/;
  return phoneRegex.test(value);
};

export const getOTPInput = (value: any) => {
  if (isValidEmail(value)) {
    return {email: value};
  }
  if (isValidPhoneNumber(value)) {
    return {
      phoneNumber: {
        countryCode: '+91',
        phoneNumber: value
      }
    };
  }
  return {
    id: value
  };
};

export const getVerificationMessage = (otpInput: string) => {
  if (isValidEmail(otpInput)) {
    return 'Verification code has been sent to linked mobile number.';
  } else {
    return `Verification code has been sent to ********${otpInput
      .toString()
      .slice(-2)}`;
  }
};
