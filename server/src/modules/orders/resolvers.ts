import { createCashfreeOrder } from './create-cashfree-order';
import { pageOfTransactions } from './page-of-transactions';
import { verifyAndCompleteCashfreeOrder } from './verify-and-complete-cashfree-order';

export default {
  Mutation: {
    createCashfreeOrder: createCashfreeOrder,
    verifyAndCompleteCashfreeOrder: verifyAndCompleteCashfreeOrder
  },
  Query: { pageOfTransactions }
};
