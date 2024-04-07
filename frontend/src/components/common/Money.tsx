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
  rootStyle?: StyleProp<TextStyle>;
}

export const Money: React.FC<MoneyPropsType> = ({
  amount,
  prefix,
  rootStyle,
  currencyStyle,
  amountStyle
}) => {
  return (
    <View style={[styles.root, rootStyle]}>
      <Text style={[styles.currency, currencyStyle]}>
        {prefix
          ? `${prefix} ${amount?.currency?.symbol}`
          : amount?.currency?.symbol}
      </Text>
      <Number value={amount.amount} textStyle={amountStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  currency: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingRight: 4,
    color: '#000000de'
  }
});

export default Money;
