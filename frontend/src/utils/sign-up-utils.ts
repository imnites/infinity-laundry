interface FormattedSignUpInputType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const mapToSignUpInput = (userDetails: FormattedSignUpInputType) => {
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

export const getVerificationMessage = (contact?: string) =>
  contact
    ? `Verification code has been sent to \n${contact}`
    : 'Verification code has been sent to linked mobile number.';
