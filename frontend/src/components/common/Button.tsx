import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  TextStyle
} from 'react-native';

interface ButtonPropsType {
  name: string;
  onPress: any;
  loading?: boolean;
  classes?: {
    button?: StyleProp<TextStyle>;
    buttonText?: StyleProp<TextStyle>;
  };
  disabled?: boolean;
}

const Button = ({
  name,
  onPress,
  loading,
  classes,
  disabled
}: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={classes?.button}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : (
        <Text style={classes?.buttonText}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
