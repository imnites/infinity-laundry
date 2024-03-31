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
          classes={{
            button: styles.continueButton,
            buttonText: styles.continueButtonText
          }}
          loading={checkoutLoading}
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
