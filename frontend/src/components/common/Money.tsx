import React from 'react';
import {Text, View, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {Number} from '.';

interface MoneyPropsType {
  amount: {
    amount: number | null;
    currency: {
      code: string;
      symbol: string;
    } | null;
  };
  prefix?: string;
  currencyStyle?: StyleProp<TextStyle>;
  amountStyle?: StyleProp<TextStyle>;
}

export const Money: React.FC<MoneyPropsType> = ({
  amount,
  prefix,
  currencyStyle,
  amountStyle
}) => {
  return (
    <View style={styles.root}>
      <Text style={[styles.currency, currencyStyle]}>
        {prefix} {amount?.currency?.symbol}
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
