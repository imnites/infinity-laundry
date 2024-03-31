import { Me } from '~/generated-types';
import { UserInfo } from '~/models';
import { Context } from '~/types';

export const mapToMe = (user: UserInfo): Me => {
  return {
    id: user.Id,
    name: user.Name,
    email: user.Email,
    enabled: user.Enabled,
    firstName: user.FirstName,
    lastName: user.LastName,
    balance: user.Balance
  };
};

export const getMe = async (
  parent: { [key: string]: unknown } | null,
  _: unknown,
  context: Context
): Promise<Me | null> => {
  const me = await context.keyCloakPublicClient.getMe();
  const user = await context.serviceClients.userService.getUserDetailsById(
    me.sub as string
  );

  if (user) {
    return mapToMe(user);
  }

  return null;
};
