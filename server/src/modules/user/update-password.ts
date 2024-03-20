import { GraphQLError } from 'graphql';
import { MutationUpdatePasswordArgs } from '~/generated-types';
import { Context } from '~/types';

export const updatePassword = async (
  parent: { [key: string]: unknown } | null,
  args: MutationUpdatePasswordArgs,
  context: Context
): Promise<boolean> => {
  const user = await context.keyCloakPublicClient.getMe();

  if (
    (Boolean(user.allowedAction) &&
      (user.allowedAction as string[]).includes('UPDATE_PASSWORD')) ||
    Boolean(user.sub)
  ) {
    await context.keycloakClient.put({
      methodName: `users/${(user.id as string) || (user.sub as string)}/reset-password`,
      input: {
        type: 'password',
        userLabel: 'password',
        value: args.password,
        temporary: false
      }
    });

    return true;
  }

  throw new GraphQLError('Unauthorized');
};
