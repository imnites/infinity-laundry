import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';
import {CFPaymentGatewayService} from 'react-native-cashfree-pg-sdk';
import {gql, useMutation} from '@apollo/client';
import {useMeContext} from '~/me';
import {Button, Money, MoneyInput} from '~/components/common';
import {PredefinedAmountChip} from './PredefinedAmountChip';

const CREATE_CASHFREE_ORDER = gql`
  mutation createCashfreeOrder($userId: String!, $amount: AmountInput!) {
    createCashfreeOrder(userId: $userId, amount: $amount) {
      cfPaymentId
      orderId
      paymentSessionId
    }
  }
`;

const predefinedAmount = [100, 200, 500, 1000];

const PaymentPage = () => {
  const [createCashfreeOrder] = useMutation(CREATE_CASHFREE_ORDER);
  const {me} = useMeContext();
  const [amount, setAmount] = useState<number | null>(null);

  const onChangeText = useCallback((value: number | null) => {
    setAmount(value);
  }, []);

  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify(orderID, _) {
        //
      },
      onError(error, orderID) {
        //
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
      if (!isNaN(parseFloat(amount as any as string))) {
        const {data} = await createCashfreeOrder({
          variables: {
            userId: me?.id,
            amount: {
              amount: parseFloat(amount as any as string),
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
      }
    } catch (e) {
      //
    }
  }, [amount, createCashfreeOrder, me]);

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Add Money</Text>
      </View>
      <View style={styles.availableBalanceContainer}>
        <Text style={styles.availableBalanceText}>Available Balance</Text>
        <View style={styles.availableBalance}>
          <Money
            amountStyle={styles.availableBalanceAmount}
            currencyStyle={styles.availableBalanceCurrency}
            amount={{
              amount: me?.balance.amount ?? null,
              currency: me?.balance.currency ?? null
            }}
          />
        </View>
      </View>
      <View style={styles.amountContainer}>
        <MoneyInput
          onAmountChange={onChangeText}
          numericStyle={styles.numericStyle}
          currencyStyle={styles.currencyStyle}
          amount={{
            amount: amount,
            currency: me?.balance.currency ?? null
          }}
          placeholder="0"
        />
        <View style={styles.amountTemplateContainer}>
          {predefinedAmount.map((val: number) => (
            <PredefinedAmountChip
              key={`${val}`}
              value={val}
              onPress={onChangeText}
            />
          ))}
        </View>
      </View>
      <View style={styles.continueButtonContainer}>
        <Button
          classes={{
            button: styles.continueButton,
            buttonText: styles.continueButtonText
          }}
          name="Continue"
          onPress={startWebCheckout}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 16,
    color: '#1c2025',
    fontWeight: '500',
    fontSize: 16
  },
  availableBalanceContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40
  },
  availableBalance: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 6
  },
  availableBalanceText: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  availableBalanceAmount: {
    color: '#1c2025',
    fontWeight: '600',
    fontSize: 16
  },
  availableBalanceCurrency: {
    color: '#1c2025',
    fontWeight: '600',
    fontSize: 16
  },
  amountContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -48
  },
  amountTemplateContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  numericStyle: {
    color: '#1c2025',
    fontWeight: 'bold',
    fontSize: 20
  },
  currencyStyle: {
    color: '#1c2025',
    fontWeight: '700',
    fontSize: 16
  },
  continueButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    backgroundColor: '#3930d8',
    borderRadius: 16
  },
  continueButtonText: {
    textAlign: 'center',
    color: 'white',
    padding: 8,
    fontSize: 16
  },
  continueButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 32
  }
});

export default PaymentPage;
