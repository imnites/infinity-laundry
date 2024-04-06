import {Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isNullOrUndefined = (val: any) =>
  val === null || val === undefined;

export const passwordStrength = (password: string): number => {
  let hasAtleast8Char = password.length >= 8;

  if (!hasAtleast8Char) {
    return 2;
  }

  let hasUpperCase = false;
  let hasLowerCase = false;
  let containsDigit = false;
  let containsSpecialCharacters = false;

  for (let c of password) {
    if (c >= 'A' && c <= 'Z') {
      hasUpperCase = true;
    } else if (c >= 'a' && c <= 'z') {
      hasLowerCase = true;
    } else if (c >= '0' && c <= '9') {
      containsDigit = true;
    } else {
      containsSpecialCharacters = true;
    }
  }

  let strength = 0;

  if (hasAtleast8Char) {
    strength += 2;
  }

  if (hasUpperCase) {
    strength += 2;
  }

  if (hasLowerCase) {
    strength += 2;
  }

  if (containsDigit) {
    strength += 2;
  }

  if (containsSpecialCharacters) {
    strength += 2;
  }

  return strength;
};
