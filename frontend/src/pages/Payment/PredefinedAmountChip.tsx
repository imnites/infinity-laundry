import React from 'react';
import {Number} from '~/components/common';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

interface PredefinedAmountChipProp {
  value: number;
  onPress: (val: number) => void;
}

export const PredefinedAmountChip: React.FC<PredefinedAmountChipProp> = ({
  value,
  onPress
}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.button} onPress={() => onPress(value)}>
        <Text style={styles.plusSymbol}>+</Text>
        <Number textStyle={styles.number} value={value} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row'
  },
  root: {
    backgroundColor: '#e0e0e0',
    paddingLeft: 16,
    paddingRight: 16,
    margin: 8,
    borderRadius: 16
  },
  number: {
    color: '#1c2025',
    fontWeight: 'bold',
    fontSize: 16
  },
  plusSymbol: {
    color: '#1c2025',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4
  }
});

export default PredefinedAmountChip;
