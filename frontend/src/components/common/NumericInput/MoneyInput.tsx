import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import {NumericInput} from './NumericInput';
import React from 'react';

interface MoneyInputProps {
  amount: {
    amount: number | null;
    currency: {
      code: string;
      symbol: string;
    } | null;
  };
  onAmountChange: (val: number | null) => void;
  placeholder?: string;
  numericStyle?: StyleProp<TextStyle>;
  currencyStyle?: StyleProp<TextStyle>;
  autoFocus?: boolean;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
  amount,
  onAmountChange,
  placeholder,
  numericStyle,
  currencyStyle,
  autoFocus
}) => {
  return (
    <View style={styles.root}>
      <Text style={[styles.currency, currencyStyle]}>
        {amount.currency?.symbol}
      </Text>
      <NumericInput
        value={amount.amount}
        onChangeText={onAmountChange}
        placeholder={placeholder}
        style={[styles.numericInput, numericStyle]}
        autoFocus={autoFocus}
      />
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
  },
  numericInput: {
    fontFamily: 'Rubik-Regular'
  }
});
