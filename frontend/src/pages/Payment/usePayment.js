import {useCallback, useEffect} from 'react';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk';
import {gql, useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

const CREATE_CASHFREE_ORDER = gql`
  mutation createCashfreeOrder($userId: String!, $amount: AmountInput!) {
    createCashfreeOrder(userId: $userId, amount: $amount) {
      cfPaymentId
      orderId
      paymentSessionId
    }
  }
`;

const COMPLETE_CASHFREE_ORDER = gql`
  mutation verifyAndCompleteCashfreeOrder($userId: String!, $orderId: String!) {
    verifyAndCompleteCashfreeOrder(userId: $userId, orderId: $orderId)
  }
`;

export const usePayment = ({amount, me, refreshMe}) => {
  const {navigate} = useNavigation();
  const [createCashfreeOrder, {loading: checkoutLoading}] = useMutation(
    CREATE_CASHFREE_ORDER
  );
  const [verifyAndCompleteCashfreeOrder] = useMutation(
    COMPLETE_CASHFREE_ORDER,
    {
      onCompleted: async () => {
        await refreshMe();
        navigate && navigate('MainPage');
      }
    }
  );

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderId) {
        verifyAndCompleteCashfreeOrder({
          variables: {
            userId: me.id,
            orderId
          }
        });
      },
      onError(error, orderId) {
        verifyAndCompleteCashfreeOrder({
          variables: {
            userId: me.id,
            orderId
          }
        });
      }
    });

    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, [me.id, verifyAndCompleteCashfreeOrder]);

  const startWebCheckout = useCallback(async () => {
    if (!me) {
      return;
    }

    try {
      if (!isNaN(parseFloat(amount))) {
        const {data} = await createCashfreeOrder({
          variables: {
            userId: me.id,
            amount: {
              amount: parseFloat(amount),
              currencyCode: me.balance.currency.code
            }
          }
        });

        const session = new CFSession(
          data.createCashfreeOrder.paymentSessionId,
          data.createCashfreeOrder.orderId,
          CFEnvironment.SANDBOX
        );
        CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
      }
    } catch (e) {
      //
    }
  }, [amount, createCashfreeOrder, me]);

  return {startWebCheckout, checkoutLoading};
};
