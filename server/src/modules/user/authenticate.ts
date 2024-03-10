import { Context } from '~/types';
import { MutationAuthenticateArgs, AuthResult } from '~/generated-types';

export const authenticate = async (
  parent: { [key: string]: unknown } | null,
  args: MutationAuthenticateArgs,
  context: Context
): Promise<AuthResult> => {
  const response = await context.keyCloakPublicClient.requestToken({
    username: args.credential.userName,
    password: args.credential.password
  });

  return {
    accessToken: response.accessToken,
    expiresInSec: response.expiresInSec,
    refreshExpiresInSec: response.refreshTokenExpiresInSec,
    refreshToken: response.refreshToken,
    tokenType: response.tokenType
  };
};
