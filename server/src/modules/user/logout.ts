import { MutationLogoutArgs } from '~/generated-types';
import { Context } from '~/types';

export const logout = async (
  parent: { [key: string]: unknown } | null,
  args: MutationLogoutArgs,
  context: Context
): Promise<boolean> => {
  await context.keyCloakPublicClient.revokeAccessToken();

  if (args.refreshToken) {
    await context.keyCloakPublicClient.revokeRefreshToken(args.refreshToken);
  }

  return true;
};
