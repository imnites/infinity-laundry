import { MutationAddPaymentArgs } from '~/generated-types';
import { Context } from '~/types';

export const addPayment = async (
  parent: { [key: string]: unknown } | null,
  args: MutationAddPaymentArgs,
  context: Context
): Promise<string> => {
  const id = await crypto.randomUUID();
  return id;
};
