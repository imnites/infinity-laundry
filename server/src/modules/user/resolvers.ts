import { authenticate } from './authenticate';
import { saveUserDraft } from './save-user-draft';
import { createUserDraft } from './create-user-draft';
import { generatePhoneOTP } from './generate-phone-otp';
import { getMe } from './get-me';
import { logout } from './logout';
import { refreshToken } from './refresh-token';
import { validatePhoneOTP } from './validate-phone-otp';
import { updatePassword } from './update-password';

export default {
  Mutation: {
    createUserDraft: createUserDraft,
    saveUserDraft: saveUserDraft,
    authenticate: authenticate,
    refreshToken: refreshToken,
    logout: logout,
    generatePhoneOTP: generatePhoneOTP,
    validatePhoneOTP: validatePhoneOTP,
    updatePassword: updatePassword
  },
  Query: {
    me: getMe
  }
};
