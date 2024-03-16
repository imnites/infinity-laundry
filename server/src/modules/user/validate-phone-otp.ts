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

  const response: OtpValidationResult = {
    phoneNumber,
    verified,
    userId,
    accessToken: null,
    expiresInSec: 0,
    tokenType: ''
  };

  if (verified && userId !== null) {
    const token = crypto.randomUUID();
    await context.redisClient.saveData(
      token,
      {
        userId,
        allowedAction: [
          allowedUserActions.updatePassword,
          allowedUserActions.saveDraft
        ]
      },
      DEFAULT_ACCESS_EXPIRED_IN_SEC
    );

    response.accessToken = token;
    response.expiresInSec = DEFAULT_ACCESS_EXPIRED_IN_SEC;
    response.tokenType = 'Basic';
  }

  return response;
};
