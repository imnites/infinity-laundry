import React from 'react';
import {Text, View, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {Number} from '.';

interface MoneyPropsType {
  amount: {
    amount: number;
    currency: {
      code: string;
      symbol: string;
    };
  };
  currencyStyle?: StyleProp<TextStyle>;
  amountStyle?: StyleProp<TextStyle>;
}

export const Money: React.FC<MoneyPropsType> = ({
  amount,
  currencyStyle,
  amountStyle
}) => {
  return (
    <View style={styles.root}>
      <Text style={[styles.currency, currencyStyle]}>
        {amount.currency.symbol}
      </Text>
      <Number value={amount.amount} textStyle={amountStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  currency: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingRight: 4
  }
});

export default Money;
