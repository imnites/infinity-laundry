import {isValidEmail} from './email-validator';
import {isValidPhoneNumber} from './phone-number-validator';

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

export const getOTPInput = (value: string) => {
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

export const getVerificationMessage = (contact?: string) =>
  contact
    ? `Verification code has been sent to ${contact}`
    : 'Verification code has been sent to linked mobile number.';
