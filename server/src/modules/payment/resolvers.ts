import { addPayment } from './add-payment';
import { getPaymentDetails } from './get-payment-details';

export default {
  Mutation: {
    addPayment: addPayment
  },
  Query: {
    paymentDetails: getPaymentDetails
  }
};
