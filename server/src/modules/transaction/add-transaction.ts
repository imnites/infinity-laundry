import { MutationAddTransactionArgs } from '~/generated-types';
import { Context } from '~/types';

export const addTransaction = async (
  parent: { [key: string]: unknown } | null,
  args: MutationAddTransactionArgs,
  context: Context
): Promise<string> => {
  const id = await crypto.randomUUID();
  return id;
};
