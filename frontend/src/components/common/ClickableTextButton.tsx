import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const ClickableTextButton: React.FC<{onPress: () => void; text: string}> = ({
  onPress,
  text
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3
  }
});

export default ClickableTextButton;
