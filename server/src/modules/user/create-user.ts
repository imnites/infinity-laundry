import { Context } from '~/types';
import { MutationCreateUserArgs } from '~/generated-types';

export const createUser = async (
  parent: { [key: string]: unknown } | null,
  args: MutationCreateUserArgs,
  context: Context
): Promise<boolean> => {
  await context.keycloakClient.post({
    methodName: 'users',
    input: {
      firstName: args.input.firstName,
      lastName: args.input.lastName,
      email: args.input.email,
      enabled: args.input.enabled,
      credentials: [
        { type: 'password', value: args.input.password, temporary: false }
      ],
      attributes: {
        phoneNumber: `${args.input.phoneNumber.countryCode} ${args.input.phoneNumber.phoneNumber}`
      }
    }
  });

  return true;
};
