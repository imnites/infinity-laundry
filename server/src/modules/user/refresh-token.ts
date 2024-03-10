import { Context } from '~/types';
import { AuthResult, MutationRefreshTokenArgs } from '~/generated-types';

export const refreshToken = async (
  parent: { [key: string]: unknown } | null,
  args: MutationRefreshTokenArgs,
  context: Context
): Promise<AuthResult> => {
  const response = await context.keyCloakPublicClient.refreshToken(
    args.refreshToken
  );

  return {
    accessToken: response.accessToken,
    expiresInSec: response.expiresInSec,
    refreshExpiresInSec: response.refreshTokenExpiresInSec,
    refreshToken: response.accessToken,
    tokenType: response.accessToken
  };
};
