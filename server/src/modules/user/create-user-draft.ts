import { Context } from '~/types';
import {
  MutationCreateUserDraftArgs,
  PhoneNumberInput
} from '~/generated-types';
import { mapToGraphQLError, errorCodes } from '~/error-mapper';
import { UserInfo } from '~/models';

const getErrorMessageAndCode = (
  user: UserInfo,
  email: string,
  phoneNumber: PhoneNumberInput
) => {
  if (
    user.Email === email &&
    user.PhoneNumber.countryCode === phoneNumber.countryCode &&
    user.PhoneNumber.phoneNumber === phoneNumber.phoneNumber
  ) {
    return {
      message: 'Email and Phone number already exists',
      code: errorCodes.EMAIL_AND_PHONE_NUMBER_ALREADY_EXISTS
    };
  }

  if (user.Email === email) {
    return {
      message: 'Email already exists',
      code: errorCodes.EMAIL_ALREADY_EXISTS
    };
  }

  return {
    message: 'Phone number already exists',
    code: errorCodes.PHONE_NUMBER_ALREADY_EXISTS
  };
};

export const createUserDraft = async (
  parent: { [key: string]: unknown } | null,
  args: MutationCreateUserDraftArgs,
  context: Context
): Promise<string> => {
  const user =
    await context.serviceClients.userService.getUserDetailsByEmailOrPhoneNumber(
      { email: args.input.email, phoneNumber: args.input.phoneNumber }
    );

  if (user) {
    const { message, code } = getErrorMessageAndCode(
      user,
      args.input.email,
      args.input.phoneNumber
    );

    throw mapToGraphQLError(message, code);
  }

  const id = crypto.randomUUID();
  await context.redisClient.saveData(id, { ...args.input, id });

  return id;
};
