import { Context, PhoneNumber } from '~/types';
import {
  MutationAuthenticateArgs,
  AuthResult,
  Credential
} from '~/generated-types';
import { isNullOrUndefined } from '~/utils';
import { GraphQLError } from 'graphql';
import { mapToMe } from './get-me';

const getUserName = async (
  context: Context,
  cred: Credential
): Promise<string> => {
  if (cred.userName != null) {
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
    try {
      const response = await context.keyCloakPublicClient.requestToken({
        username: userName,
        password: args.credential.password
      });

      context.keyCloakPublicClient.authorization = `${response.tokenType} ${response.accessToken}`;

      const me = await context.keyCloakPublicClient.getMe();

      return {
        accessToken: response.accessToken,
        expiresInSec: response.expiresInSec,
        refreshExpiresInSec: response.refreshTokenExpiresInSec,
        refreshToken: response.refreshToken,
        tokenType: response.tokenType,
        me: mapToMe(me)
      };
    } catch (ex) {
      throw new GraphQLError('Invalid Credentials!');
    }
  }

  throw new GraphQLError('User not found');
};
