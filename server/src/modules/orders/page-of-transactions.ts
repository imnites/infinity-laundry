import { QueryPageOfTransactionsArgs, Transaction } from '~/generated-types';

export const pageOfTransactions = async (
  parent: { [key: string]: unknown } | null,
  args: QueryPageOfTransactionsArgs,
  context: Context
): Promise<Transaction[]> => {
  //
  return [];
};
