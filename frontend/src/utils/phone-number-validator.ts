const phoneNumberRegex = /^((\+?\d{1,3}|\d{1,4})?[0-9]{10})$/;

export const isValidPhoneNumber = (value: string) =>
  phoneNumberRegex.test(value.replace(/\s/g, ''));
