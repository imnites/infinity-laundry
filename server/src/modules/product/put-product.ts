import { Context } from '~/types';

export const putProduct = async (
  parent: { [key: string]: unknown } | null,
  args: { product: { name: string } },
  context: Context
): Promise<void> => {
  await context.serviceClients.productServices.putProduct({
    target: { id: '' },
    product: { name: args.product.name, description: '' }
  });
};
