import { Context } from '~/types';
import { createOrder } from '~/cashfree-client';
import {
  CashfreeOrderResult,
  MutationCreateCashfreeOrderArgs
} from '~/generated-types';
import { GraphQLError } from 'graphql';

export const createCashfreeOrder = async (
  parent: { [key: string]: unknown } | null,
  args: MutationCreateCashfreeOrderArgs,
  context: Context
): Promise<CashfreeOrderResult> => {
  const me = await context.keyCloakPublicClient.getMe();

  const user = await context.serviceClients.userService.getUserDetailsById(
    me.sub as string
  );

  if (user !== null && user.Id === args.userId) {
    const order = await createOrder({
      amount: {
        amount: args.amount.amount,
        currencyCode: args.amount.currencyCode
      },
      customer: {
        id: user.Id,
        email: user.Email,
        name: user.Name,
        phoneNumber: user.PhoneNumber
      }
    });

    return {
      cfPaymentId: order.cf_order_id ?? '',
      paymentSessionId: order.payment_session_id ?? '',
      orderId: order.order_id ?? ''
    };
  }

  throw new GraphQLError('Unauthorized');
};
