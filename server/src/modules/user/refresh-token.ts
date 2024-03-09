import { Context } from '~/types';
import { AuthResult, MutationRefreshTokenArgs } from '~/generated-types';

export const refreshToken = async (
  parent: { [key: string]: unknown } | null,
  args: MutationRefreshTokenArgs,
  context: Context
): Promise<AuthResult> => {
  const response = await context.keyCloakPublicClient.refreshToken({
    refreshToken: args.refreshToken.token
  });

  return {
    accessToken: response.accessToken,
    expiresInMS: response.expiresInMS,
    refreshExpiresInMS: response.refreshTokenExpiresInMS,
    refreshToken: response.accessToken,
    tokenType: response.accessToken
  };
};
