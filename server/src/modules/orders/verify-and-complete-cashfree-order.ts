import moment from 'moment';
import { AbstractDataType } from 'sequelize';
import { fetchPaymentsForOrder } from '~/cashfree-client';
import { mapToGraphQLError } from '~/error-mapper';
import { MutationVerifyAndCompleteCashfreeOrderArgs } from '~/generated-types';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '~/models';
import { Context } from '~/types';

export const verifyAndCompleteCashfreeOrder = async (
  parent: { [key: string]: unknown } | null,
  args: MutationVerifyAndCompleteCashfreeOrderArgs,
  context: Context
): Promise<boolean> => {
  const me = await context.keyCloakPublicClient.getMe();
  const user = await context.serviceClients.userService.getUserDetailsById(
    me?.sub as string
  );

  if (user?.Id !== args.userId) {
    throw mapToGraphQLError('logged in user and payment user should be same');
  }

  const payments = await fetchPaymentsForOrder({
    orderId: args.orderId
  });

  await Promise.all(
    payments.map((payment) =>
      context.serviceClients.transactionsService.createNewTransaction({
        userId: user.Id as unknown as AbstractDataType,
        amount: payment.payment_amount ?? 0,
        currencyCode: payment.payment_currency ?? user.Balance.currency.code,
        type: TRANSACTION_TYPE.CREDIT,
        status: payment.payment_status as TRANSACTION_STATUS,
        transactionTime: payment.payment_time ?? moment.utc().toISOString(),
        transactionCompletionTime: payment.payment_completion_time,
        keyValue: {
          payment: {
            order_id: payment.order_id,
            cf_payment_id: payment.cf_payment_id,
            payment_method: payment.payment_method,
            payment_group: payment.payment_group,
            bank_reference: payment.bank_reference,
            payment_message: payment.payment_message
          },
          name: user.Name,
          email: user.Email
        }
      })
    )
  );

  return true;
};
