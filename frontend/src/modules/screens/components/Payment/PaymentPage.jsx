import React, {useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk';
import {gql, useMutation} from '@apollo/client';
import {useMeContext} from '../../../../wrapper/Me';
import {Button} from '~/modules/common/components';

const CREATE_CASHFREE_ORDER = gql`
  mutation createCashfreeOrder($userId: String!, $amount: AmountInput!) {
    createCashfreeOrder(userId: $userId, amount: $amount) {
      cfPaymentId
      orderId
      paymentSessionId
    }
  }
`;

const PaymentPage = () => {
  const [createCashfreeOrder] = useMutation(CREATE_CASHFREE_ORDER);
  const {user} = useMeContext();

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderID, _) {
        console.log(_);
        console.log(orderID);
      },
      onError(error, orderID) {
        console.log(error);
        console.log(orderID);
      }
    });

    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, []);

  const startWebCheckout = useCallback(async () => {
    if (!user) {
      return;
    }
    try {
      const {data} = await createCashfreeOrder({
        variables: {
          userId: user?.id,
          amount: {
            amount: 200,
            currencyId: 'INR'
          }
        }
      });

      const session = new CFSession(
        data.createCashfreeOrder.paymentSessionId,
        data.createCashfreeOrder.orderId,
        CFEnvironment.SANDBOX
      );
      CFPaymentGatewayService.doWebPayment(JSON.stringify(session));
    } catch (e) {
      console.log(e);
      //
    }
  }, [createCashfreeOrder, user]);

  return (
    <View>
      <Text>Payment</Text>
      <Button name="Add Fund" onPress={startWebCheckout} />
    </View>
  );
};

export default PaymentPage;
