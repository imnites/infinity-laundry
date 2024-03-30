import { addTransaction } from './add-transaction';
import { getTransactionDetails } from './get-transaction-details';

export default {
  Mutation: {
    addTransaction: addTransaction
  },
  Query: {
    transactionDetails: getTransactionDetails
  }
};
