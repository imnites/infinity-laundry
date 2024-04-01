import moment from 'moment';
import { QueryPageOfTransactionsArgs, Transaction } from '~/generated-types';
import { TRANSACTION_TYPE } from '~/models';
import { currenciesByCode } from '~/models/const';
import { Context } from '~/types';

export const pageOfTransactions = async (
  parent: { [key: string]: unknown } | null,
  args: QueryPageOfTransactionsArgs,
  context: Context
): Promise<Transaction[]> => {
  console.log(args);
  const response =
    await context.serviceClients.transactionsService.getPageTransactionsFilteredByTransactionsSearch(
      {
        dateRange: {
          startDate: args.filter?.dateRange?.startDate,
          endDate: args.filter?.dateRange?.endDate
        },
        statuses: args.filter?.statuses
      }
    );

  return response.map((r) => ({
    id: r.Id,
    amount: {
      amount: r.Amount,
      currency: currenciesByCode[r.CurrencyCode]
    },
    type: r.Type,
    status: r.Status,
    transactionTime: moment(r.TransactionTime).format('YYYY-MM-DDTHH:mm:ssZ'),
    transactionCompletionTime: moment(r.TransactionCompletionTime).format(
      'YYYY-MM-DDTHH:mm:ssZ'
    ),
    resource:
      r.KeyValue && r.Type === TRANSACTION_TYPE.DEBIT
        ? {
            id: r.KeyValue.resource?.id as string,
            name: r.KeyValue.resource?.name as string,
            code: r.KeyValue.resource?.code as string
          }
        : null
  }));
};
