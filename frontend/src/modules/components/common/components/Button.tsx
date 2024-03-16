import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

interface ButtonPropsType {
  name: string;
  onPress: any;
  loading?: boolean;
  classes?: any;
}

const Button = ({name, onPress, loading, classes}: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={classes.button}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={classes.buttonText}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
