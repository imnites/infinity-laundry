import { Me } from '~/generated-types';
import { Context } from '~/types';

export const mapToMe = (details: {
  [key: string]: unknown;
}): {
  id: string;
  name: string;
  email: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
} => {
  return {
    id: details.sub as string,
    name: details.name as string,
    email: details.email as string,
    enabled: true,
    firstName: details.given_name as string,
    lastName: details.family_name as string
  };
};

export const getMe = async (
  parent: { [key: string]: unknown } | null,
  _: unknown,
  context: Context
): Promise<Me> => {
  const details = await context.keyCloakPublicClient.getMe();

  return mapToMe(details);
};
