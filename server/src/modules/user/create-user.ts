import { Context } from '~/types';
import { MutationCreateUserArgs, UserReference } from '~/generated-types';

export const createUser = async (
  parent: { [key: string]: unknown } | null,
  args: MutationCreateUserArgs,
  context: Context
): Promise<UserReference> => {
  const response = await context.keyCloakClient.post('users', {
    firstName: args.input.firstName,
    lastName: args.input.lastName,
    email: args.input.email,
    enabled: args.input.enabled,
    username: args.input.userName
  });

  console.log('response', response);

  return {
    id: 'response.id as string',
    name: 'response.name as string'
  };
};
