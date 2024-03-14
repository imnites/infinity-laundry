import { MutationGeneratePhoneOtpArgs, OtpResult } from '~/generated-types';
import { Context } from '~/types';

export const generatePhoneOTP = async (
  parent: { [key: string]: unknown } | null,
  args: MutationGeneratePhoneOtpArgs,
  context: Context
): Promise<OtpResult> => {
  return context.sMSCountryClient.sendOTP({
    phoneNumber: {
      countryCode: args.phoneNumber.countryCode,
      phoneNumber: args.phoneNumber.phoneNumber
    }
  });
};
