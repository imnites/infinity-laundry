import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {useNumberFormat} from '~/hooks';

interface NumberPropsType {
  value: number | null;
  textStyle?: StyleProp<TextStyle>;
}

const Number: React.FC<NumberPropsType> = ({value, textStyle}) => {
  const {formatNumber} = useNumberFormat();
  return <Text style={textStyle}>{formatNumber(value ?? 0)}</Text>;
};

export default Number;
