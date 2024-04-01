import { Context } from '~/types';
import { MutationCreateUserDraftArgs } from '~/generated-types';
import { GraphQLError } from 'graphql';
import { mapToGraphQLError } from '~/error-mapper';

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

  if (userDetailsByEmail && userDetailsByPhoneNumber) {
    throw mapToGraphQLError('Email and Phone number already exists', '200');
  } else if (userDetailsByEmail) {
    throw mapToGraphQLError('Email already exists', '201');
  } else if (userDetailsByPhoneNumber) {
    throw mapToGraphQLError('Phone number already exists', '202');
  } else {
    await context.redisClient.saveData(id, { ...args.input, id });
    return id;
  }
};
