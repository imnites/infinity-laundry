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
      phoneNumber: userDetails.phoneNumber,
    },
  };
};
