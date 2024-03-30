import { TransactionDetailsInput, TransactionDetails } from '~/generated-types';
import { Context } from '~/types';

const mapToTransactionDetails = (
  results: { [key: string]: unknown }[]
): TransactionDetails[] => {
  return results.map((result) => {
    return {
      id: result.id as string,
      userId: result.userId as string,
      type: result.type as string,
      machineDetails: {
        machineId: result.machineId as string,
        machineNumber: result.machineNumber as string
      },
      amount: {
        amount: result.amount as number,
        currency: {
          id: result.currencyId as string
        }
      },
      timestamp: result.timestamp as string,
      completed: result.completed === true ? true : false
    };
  });
};

export const getTransactionDetails = (
  parent: { [key: string]: unknown } | null,
  args: TransactionDetailsInput,
  context: Context
): TransactionDetails[] => {
  const id = crypto.randomUUID();

  return mapToTransactionDetails([
    {
      id: id,
      userId: 'urn:user:01',
      type: 'Usage',
      amount: 0.0,
      currencyId: 'urn:currency:01',
      machineNumber: 'Machine A',
      machineId: '123456',
      timestamp: '2024-03-20T10:30:00Z',
      completed: true
    }
  ]);
};
