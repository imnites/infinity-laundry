import { createCashfreeOrder } from './create-cashfree-order';
import { fetchCashfreeOrder } from './fetch-cashfree-order';

export default {
  Mutation: {
    createCashfreeOrder: createCashfreeOrder
  },
  Query: {
    fetchCashfreeOrder: fetchCashfreeOrder
  }
};
