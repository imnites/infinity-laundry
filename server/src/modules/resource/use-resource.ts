import moment from 'moment';
import { AbstractDataType } from 'sequelize';
import { MutationUseResourceArgs, UseResourceResult } from '~/generated-types';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '~/models';
import { Context } from '~/types';

export const useResource = async (
  parent: { [key: string]: unknown } | null,
  args: MutationUseResourceArgs,
  context: Context
): Promise<UseResourceResult | null> => {
  const me = await context.keyCloakPublicClient.getMe();
  const user = await context.serviceClients.userService.getUserDetailsById(
    me?.sub as string
  );

  if (user) {
    const resource =
      await context.serviceClients.resourceService.getResourceByCode(args.code);

    if (resource) {
      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');

      const transactionId =
        await context.serviceClients.transactionsService.createNewTransaction({
          userId: user.Id as unknown as AbstractDataType,
          amount: resource.AmountPerUse.amount,
          currencyCode: resource.AmountPerUse.currency.code,
          type: TRANSACTION_TYPE.DEBIT,
          status: TRANSACTION_STATUS.SUCCESS,
          transactionTime: now,
          transactionCompletionTime: now,
          keyValue: {
            resource: {
              id: resource.Id,
              code: resource.Code,
              name: resource.Name
            },
            name: user.Name,
            email: user.Email
          }
        });

      return transactionId
        ? {
            transactionId: transactionId,
            status: TRANSACTION_STATUS.SUCCESS
          }
        : null;
    }
  }

  return null;
};
