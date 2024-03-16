import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface ButtonPropsType {
  name: string;
  onPress: any;
  loading?: boolean;
}

const Button = ({name, onPress, loading}: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.buttonText}>{name}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Button;
