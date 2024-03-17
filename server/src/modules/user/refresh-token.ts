import { Context } from '~/types';
import { AuthResult, MutationRefreshTokenArgs } from '~/generated-types';
import { mapToMe } from './get-me';

export const refreshToken = async (
  parent: { [key: string]: unknown } | null,
  args: MutationRefreshTokenArgs,
  context: Context
): Promise<AuthResult> => {
  const response = await context.keyCloakPublicClient.refreshToken(
    args.refreshToken
  );

  context.keyCloakPublicClient.authorization = `${response.tokenType} ${response.accessToken}`;

  const me = await context.keyCloakPublicClient.getMe();

  return {
    accessToken: response.accessToken,
    expiresInSec: response.expiresInSec,
    refreshExpiresInSec: response.refreshTokenExpiresInSec,
    refreshToken: response.accessToken,
    tokenType: response.tokenType,
    me: mapToMe(me)
  };
};
