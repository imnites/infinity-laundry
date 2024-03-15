import { GraphQLError } from 'graphql';
import { Context } from '~/types';

export const updatePassword = async (
  parent: { [key: string]: unknown } | null,
  args: string,
  context: Context
): Promise<boolean> => {
  const user = await context.keyCloakPublicClient.getMe();

  if ((user.allowedAction as string[]).includes('UPDATE_PASSWORD')) {
    await context.keycloakClient.put({
      methodName: `users/${user.id as string}/reset-password`,
      input: {
        type: 'password',
        userLabel: 'password',
        value: 'NewPassword',
        temporary: false
      }
    });

    return true;
  }

  throw new GraphQLError('Unauthorized');
};
