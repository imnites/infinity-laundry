import { MutationValidatePhoneOtpArgs } from '~/generated-types';
import { Context } from '~/types';

export const validatePhoneOTP = async (
  parent: { [key: string]: unknown } | null,
  args: MutationValidatePhoneOtpArgs,
  context: Context
): Promise<boolean> => {
  const { verified } = await context.sMSCountryClient.validateOTP({
    phoneNumber: {
      countryCode: args.phoneNumber.countryCode,
      phoneNumber: args.phoneNumber.phoneNumber
    },
    apiId: args.apiId,
    otp: args.otp
  });

  return verified;
};
