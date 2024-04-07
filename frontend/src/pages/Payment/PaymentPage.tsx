import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useMeContext} from '~/me';
import {Button, Money, MoneyInput} from '~/components/common';
import {PredefinedAmountChip} from './PredefinedAmountChip';
import {usePayment} from './usePayment';

const predefinedAmount = [100, 200, 500, 1000];

const PaymentPage = () => {
  const {me, refresh} = useMeContext();
  const [amount, setAmount] = useState<number | null>(null);

  const {startWebCheckout, checkoutLoading} = usePayment({
    amount,
    me,
    refreshMe: refresh
  });

  const onChangeText = useCallback((value: number | null) => {
    setAmount(value);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
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
            autoFocus
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
            fullWidth
            variant="shadow"
            loading={checkoutLoading}
            onPress={startWebCheckout}>
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff'
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400
  },
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
    marginRight: 'auto',
    color: '#0009'
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
    borderRadius: 16,
    padding: 10
  },
  continueButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },
  continueButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 32
  }
});

export default PaymentPage;
