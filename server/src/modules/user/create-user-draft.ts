import { Context } from '~/types';
import { MutationCreateUserDraftArgs } from '~/generated-types';
import { GraphQLError } from 'graphql';

export const createUserDraft = async (
  parent: { [key: string]: unknown } | null,
  args: MutationCreateUserDraftArgs,
  context: Context
): Promise<string> => {
  const id = crypto.randomUUID();
  await context.redisClient.saveData(id, { ...args.input, id });

  const [userDetailsByEmail, userDetailsByPhoneNumber] = await Promise.all([
    context.serviceClients.userService.getUserDetailsByEmail(args.input.email),
    context.serviceClients.userService.getUserDetailsByPhoneNumber(
      args.input.phoneNumber
    )
  ]);

  if (userDetailsByEmail) {
    throw new GraphQLError('Email already exists', {
      extensions: {
        code: 'EMAIL_ALREADY_EXISTS'
      }
    });
  } else if (userDetailsByPhoneNumber) {
    throw new GraphQLError('Phone number already exists', {
      extensions: {
        code: 'PHONE_NUMBER_ALREADY_EXISTS'
      }
    });
  } else {
    await context.redisClient.saveData(id, { ...args.input, id });
    return id;
  }
};
