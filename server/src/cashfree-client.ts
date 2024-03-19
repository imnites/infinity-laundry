/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Cashfree, OrderEntity, PaymentEntity } from 'cashfree-pg';
import {
  cashfreeXClientid,
  cashfreeXClientsecret,
  cashfreeXEnvironment
} from './config';
import { PhoneNumber } from './types';
import { GraphQLError } from 'graphql';

const API_VERSION = '2023-08-01';

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

  return Cashfree.PGCreateOrder(API_VERSION, request)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw new GraphQLError(error.response.data as string);
    });
};

export const getOrderDetails = async ({
  orderId,
  cfPaymentId
}: {
  orderId: string;
  cfPaymentId: string;
}): Promise<PaymentEntity> => {
  return Cashfree.PGOrderFetchPayment(API_VERSION, orderId, cfPaymentId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new GraphQLError(error.response.data as string);
    });
};
