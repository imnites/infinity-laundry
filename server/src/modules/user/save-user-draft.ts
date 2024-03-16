import { Context } from '~/types';
import { MutationSaveUserDraftArgs, UserInput } from '~/generated-types';
import { GraphQLError } from 'graphql';
import { AbstractDataType } from 'sequelize';

const DEFAULT_ACCESS_EXPIRED_IN_SEC = 300;

export const saveUserDraft = async (
  parent: { [key: string]: unknown } | null,
  args: MutationSaveUserDraftArgs,
  context: Context
): Promise<boolean> => {
  const user = await context.keyCloakPublicClient.getMe();

  if ((user.allowedAction as string[]).includes('SAVE_DRAFT')) {
    const data = await context.redisClient.retrieveData<UserInput>(
      user.id as string
    );

    if (data === null) {
      throw new GraphQLError('data expired, please try again');
    }

    await context.keycloakClient.post({
      methodName: 'users',
      input: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        enabled: data.enabled,
        attributes: {
          phoneNumber: `${data.phoneNumber.countryCode} ${data.phoneNumber.phoneNumber}`
        }
      }
    });

    const users = (await context.keycloakClient.getRequest(
      `users?email=${data.email}`
    )) as { id: string }[];

    const [{ id }] = users;

    await context.serviceClients.userService.createNewUser({
      id: id as unknown as AbstractDataType,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      enabled: data.enabled,
      phoneNumber: data.phoneNumber
    });

    await context.keyCloakPublicClient.updateUserForAccessToken(
      id,
      DEFAULT_ACCESS_EXPIRED_IN_SEC
    );

    return true;
  }

  throw new GraphQLError('unauthorized');
};
