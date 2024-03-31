import { QueryResourceDetailsArgs, Resource } from '~/generated-types';
import { Context } from '~/types';

export const getResourceDetails = async (
  parent: { [key: string]: unknown } | null,
  args: QueryResourceDetailsArgs,
  context: Context
): Promise<Resource | null> => {
  const me = await context.keyCloakPublicClient.getMe();
  if (me && me.sub) {
    const resource =
      await context.serviceClients.resourceService.getResourceByCode(args.code);

    if (resource) {
      return {
        id: resource.Id,
        code: resource.Code,
        name: resource.Name,
        amountPerUse: resource.AmountPerUse,
        type: resource.Type,
        maxCapacity:
          resource.KeyValues && (resource.KeyValues.maxCapacity as string)
      };
    }
  }

  return null;
};
