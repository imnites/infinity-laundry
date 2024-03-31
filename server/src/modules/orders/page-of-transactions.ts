/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryPageOfTransactionsArgs, Transaction } from '~/generated-types';
import { Context } from '~/types';

export const pageOfTransactions = async (
  _parent: { [key: string]: unknown } | null,
  _args: QueryPageOfTransactionsArgs,
  _context: Context
): Promise<Transaction[]> => {
  //
  return [];
};
