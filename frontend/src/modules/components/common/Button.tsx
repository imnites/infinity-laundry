import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ButtonPropsType {
  name: string;
  onPress: any;
}

const Button = ({name, onPress}: ButtonPropsType) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{name}</Text>
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
