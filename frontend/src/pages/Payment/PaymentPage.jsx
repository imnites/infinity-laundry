import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk';
import {gql, useMutation} from '@apollo/client';
import {useMeContext} from '~/me';
import {Button} from '~/components/common';

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
  const {me} = useMeContext();
  const [amount, setAmount] = useState(0);

  const onChangeText = useCallback(value => {
    setAmount(value);
  }, []);

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
    if (!me) {
      return;
    }
    try {
      const {data} = await createCashfreeOrder({
        variables: {
          userId: me?.id,
          amount: {
            amount: parseFloat(amount || 0),
            currencyId: me.balance.currency.code
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
  }, [amount, createCashfreeOrder, me]);

  return (
    <View style={styles.container}>
      <Text>Enter Amount</Text>
      <View>
        <TextInput
          style={styles.box}
          keyboardType="number-pad"
          onChangeText={onChangeText}
          value={amount}
          autoFocus
          editable
        />
      </View>
      <Button name="Continue" onPress={startWebCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center'
  }
});

export default PaymentPage;
