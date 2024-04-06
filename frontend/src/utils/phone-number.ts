import {isValidPhoneNumber} from './phone-number-validator';

export const mapToPhoneNumber = (phoneNumber: string) => {
  if (isValidPhoneNumber(phoneNumber)) {
    const phone = phoneNumber.replace(/\s/g, '');

    const len = phone.length;

    return {
      countryCode: phone.substring(0, len - 10) || '+91',
      phoneNumber: phone.substring(len - 10)
    };
  }
};
