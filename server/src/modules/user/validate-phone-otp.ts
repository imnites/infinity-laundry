import {
  MutationValidatePhoneOtpArgs,
  OtpValidationResult
} from '~/generated-types';
import { Context } from '~/types';

const allowedUserActions = {
  updatePassword: 'UPDATE_PASSWORD',
  saveDraft: 'SAVE_DRAFT'
};

const DEFAULT_ACCESS_EXPIRED_IN_SEC = 600;

export const validatePhoneOTP = async (
  parent: { [key: string]: unknown } | null,
  args: MutationValidatePhoneOtpArgs,
  context: Context
): Promise<OtpValidationResult> => {
  const { verified, userId, phoneNumber } =
    await context.sMSCountryClient.validateOTP({
      verificationToken: args.verificationToken,
      otp: args.otp
    });

  const response = {
    phoneNumber,
    verified,
    userId,
    accessToken: null,
    expiresInSec: 0
  };

  if (verified && userId !== null) {
    await context.redisClient.saveData(
      userId,
      {
        userId,
        allowedAction: [
          allowedUserActions.updatePassword,
          allowedUserActions.saveDraft
        ]
      },
      DEFAULT_ACCESS_EXPIRED_IN_SEC
    );
  }

  return response;
};
