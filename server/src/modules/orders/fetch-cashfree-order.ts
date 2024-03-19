import { getOrderDetails } from '~/cashfree-client';
import { QueryFetchCashfreeOrderArgs } from '~/generated-types';
import { Context } from '~/types';

export const fetchCashfreeOrder = async (
  parent: { [key: string]: unknown } | null,
  args: QueryFetchCashfreeOrderArgs,
  context: Context
): Promise<string> => {
  await getOrderDetails({
    orderId: args.orderId,
    cfPaymentId: args.cfPaymentId
  });

  return '';
};
