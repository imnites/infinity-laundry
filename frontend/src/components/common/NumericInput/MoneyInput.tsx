import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import {NumericInput} from './NumericInput';
import React from 'react';

interface MoneyInputProps {
  amount: {
    amount: number;
    currency: {
      code: string;
      symbol: string;
    };
  };
  onAmountChange: (val: number | null) => void;
  placeholder?: string;
  numericStyle?: StyleProp<TextStyle>;
  currencyStyle?: StyleProp<TextStyle>;
}

export const MoneyInput: React.FC<MoneyInputProps> = ({
  amount,
  onAmountChange,
  placeholder,
  numericStyle,
  currencyStyle
}) => {
  return (
    <View style={styles.root}>
      <Text style={[styles.currency, currencyStyle]}>
        {amount.currency.symbol}
      </Text>
      <NumericInput
        value={amount.amount}
        onChangeText={onAmountChange}
        placeholder={placeholder}
        style={numericStyle}
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
  }
});
