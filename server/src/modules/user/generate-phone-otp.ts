import { GraphQLError } from 'graphql';
import {
  MutationGeneratePhoneOtpArgs,
  OtpInput,
  OtpResult
} from '~/generated-types';
import { UserInfo } from '~/models';
import { Context, PhoneNumber } from '~/types';
import { isNullOrUndefined } from '~/utils';

type UserRef = {
  id: string;
  email: string;
  phoneNumber: PhoneNumber;
};

const mapUserObjToUserRef = (userObj: UserInfo): UserRef => ({
  id: userObj.Id,
  phoneNumber: userObj.PhoneNumber,
  email: userObj.Email
});

const getUserRefOrError = (userObj: UserInfo | null): UserRef => {
  if (userObj === null) {
    throw new GraphQLError('User not found');
  }

  return mapUserObjToUserRef(userObj);
};

const getUser = async (
  context: Context,
  { id, email, phoneNumber }: OtpInput
): Promise<UserRef> => {
  if (!isNullOrUndefined(id)) {
    const user = await context.redisClient.retrieveData<UserRef>(id ?? '');

    if (user !== null) {
      return user;
    }

    const userObj = await context.serviceClients.userService.getUserDetailsById(
      id ?? ''
    );

    return getUserRefOrError(userObj);
  }

  if (!isNullOrUndefined(phoneNumber)) {
    const userObj =
      await context.serviceClients.userService.getUserDetailsByPhoneNumber({
        countryCode: phoneNumber?.countryCode ?? '',
        phoneNumber: phoneNumber?.phoneNumber ?? ''
      });

    return getUserRefOrError(userObj);
  }

  const userObj =
    await context.serviceClients.userService.getUserDetailsByEmail(email ?? '');

  return getUserRefOrError(userObj);
};

export const generatePhoneOTP = async (
  parent: { [key: string]: unknown } | null,
  args: MutationGeneratePhoneOtpArgs,
  context: Context
): Promise<OtpResult> => {
  if (
    isNullOrUndefined(args.otpInput.id) &&
    isNullOrUndefined(args.otpInput.email) &&
    isNullOrUndefined(args.otpInput.phoneNumber)
  ) {
    throw new GraphQLError('either of id, email or phone number is required.');
  }

  const user = await getUser(context, args.otpInput);

  const response = await context.sMSCountryClient.sendOTP({
    phoneNumber: user.phoneNumber,
    userId: user.id
  });

  return {
    id: response.id,
    success: response.success,
    verificationToken: response.verificatonToken,
    phoneNumber: {
      countryCode: user.phoneNumber.countryCode,
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      phoneNumber: `*******${user.phoneNumber.phoneNumber.substring(7)}`
    }
  };
};
