import { Context } from '~/types';

export const getProducts = async (
  parent: { [key: string]: unknown } | null,
  args: { id: string },
  context: Context
): Promise<{ id: string; name: string }[]> => {
  const res = await Promise.resolve([
    {
      id: '1',
      name: 'Product 1'
    },
    {
      id: '2',
      name: 'Product 2'
    }
  ]);

  return res;
};
