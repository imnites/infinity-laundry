/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Cashfree, OrderEntity, PaymentEntity } from 'cashfree-pg';
import {
  cashfreeXClientid,
  cashfreeXClientsecret,
  cashfreeXEnvironment,
  cashfreeAPIVersion
} from './config';
import { PhoneNumber } from './types';
import { mapToGraphQLError } from './error-mapper';

Cashfree.XClientId = cashfreeXClientid;
Cashfree.XClientSecret = cashfreeXClientsecret;
Cashfree.XEnvironment =
  cashfreeXEnvironment === 'PRODUCTION'
    ? Cashfree.Environment.PRODUCTION
    : Cashfree.Environment.SANDBOX;

export const createOrder = async ({
  amount,
  customer
}: {
  amount: {
    amount: number;
    currencyCode: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    phoneNumber: PhoneNumber;
  };
}): Promise<OrderEntity> => {
  const request = {
    order_amount: amount.amount,
    order_currency: amount.currencyCode,
    customer_details: {
      customer_id: customer.id,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: `${customer.phoneNumber.countryCode}${customer.phoneNumber.phoneNumber}`
    },
    order_meta: {
      return_url: ''
    },
    order_note: ''
  };

  return Cashfree.PGCreateOrder(cashfreeAPIVersion, request)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw mapToGraphQLError(
        error.response.data.message as string,
        error.response.data.code as string
      );
    });
};

export const fetchOrder = async ({
  orderId
}: {
  orderId: string;
}): Promise<OrderEntity> => {
  return Cashfree.PGFetchOrder(cashfreeAPIVersion, orderId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw mapToGraphQLError(
        error.response.data.message as string,
        error.response.data.code as string
      );
    });
};

export const fetchPaymentDetails = async ({
  orderId,
  cfPaymentId
}: {
  orderId: string;
  cfPaymentId: string;
}): Promise<PaymentEntity> => {
  return Cashfree.PGOrderFetchPayment(cashfreeAPIVersion, orderId, cfPaymentId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw mapToGraphQLError(
        error.response.data.message as string,
        error.response.data.code as string
      );
    });
};

export const fetchPaymentsForOrder = async ({
  orderId
}: {
  orderId: string;
}): Promise<PaymentEntity[]> => {
  return Cashfree.PGOrderFetchPayments(cashfreeAPIVersion, orderId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw mapToGraphQLError(
        error.response.data.message as string,
        error.response.data.code as string
      );
    });
};
