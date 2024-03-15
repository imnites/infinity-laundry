import { Context, PhoneNumber } from '~/types';
import {
  MutationAuthenticateArgs,
  AuthResult,
  Credential
} from '~/generated-types';
import { isNullOrUndefined } from '~/utils';
import { GraphQLError } from 'graphql';

const getUserName = async (
  context: Context,
  cred: Credential
): Promise<string> => {
  if (cred.userName) {
    return cred.userName;
  }

  const user =
    await context.serviceClients.userService.getUserDetailsByPhoneNumber(
      cred.phoneNumber as PhoneNumber
    );

  return user?.Email ?? '';
};

export const authenticate = async (
  parent: { [key: string]: unknown } | null,
  args: MutationAuthenticateArgs,
  context: Context
): Promise<AuthResult> => {
  if (
    isNullOrUndefined(args.credential.userName) &&
    isNullOrUndefined(args.credential.phoneNumber)
  ) {
    throw new GraphQLError('Either of userName or phone number is required');
  }

  const userName = await getUserName(context, args.credential);

  if (userName) {
    const response = await context.keyCloakPublicClient.requestToken({
      username: userName,
      password: args.credential.password
    });

    return {
      accessToken: response.accessToken,
      expiresInSec: response.expiresInSec,
      refreshExpiresInSec: response.refreshTokenExpiresInSec,
      refreshToken: response.refreshToken,
      tokenType: response.tokenType
    };
  }

  throw new GraphQLError('User not found');
};
