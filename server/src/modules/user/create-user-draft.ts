import { Context } from '~/types';
import { MutationCreateUserDraftArgs } from '~/generated-types';

export const createUserDraft = async (
  parent: { [key: string]: unknown } | null,
  args: MutationCreateUserDraftArgs,
  context: Context
): Promise<string> => {
  const id = crypto.randomUUID();

  const [userDetailsByEmail, userDetailsByPhoneNumber] = await Promise.all([
    context.serviceClients.userService.getUserDetailsByEmail(args.input.email),
    context.serviceClients.userService.getUserDetailsByPhoneNumber(args.input.phoneNumber)
  ]);

  const { GraphQLError } = require('graphql');
  if (userDetailsByEmail) {
    throw new GraphQLError('Email already exists', null, null, null, null, null, {
      code: 201
    });

  } else if (userDetailsByPhoneNumber) {
    throw new GraphQLError('Phone number already exists', null, null, null, null, null, {
      code: 202
    });
  } else {
    await context.redisClient.saveData(id, { ...args.input, id });
    return id;
  }
};
