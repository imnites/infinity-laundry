import { Context } from '~/types';
import { MutationSaveUserDraftArgs, UserInput } from '~/generated-types';
import { GraphQLError } from 'graphql';
import { UUIDV4 } from 'sequelize';

export const saveUserDraft = async (
  parent: { [key: string]: unknown } | null,
  args: MutationSaveUserDraftArgs,
  context: Context
): Promise<boolean> => {
  const data = await context.redisClient.retrieveData<UserInput>(args.draftId);

  if (data !== null) {
    const isPhoneNumberVerified =
      await context.sMSCountryClient.isPhoneNumberVerified(data.phoneNumber);

    if (!isPhoneNumberVerified) {
      throw new GraphQLError('Phone number not verified');
    }

    const uuid = UUIDV4();

    await context.keycloakClient.post({
      methodName: 'users',
      input: {
        id: uuid.key,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        enabled: data.enabled,
        attributes: {
          phoneNumber: `${data.phoneNumber.countryCode} ${data.phoneNumber.phoneNumber}`
        }
      }
    });

    await context.serviceClients.userService.createNewUser({
      id: uuid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      enabled: data.enabled,
      phoneNumber: data.phoneNumber
    });

    return true;
  }

  throw new GraphQLError('Data is expired, please try again');
};
