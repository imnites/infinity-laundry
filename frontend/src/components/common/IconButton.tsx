import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

interface IconButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onPress,
  buttonStyle
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {}
});
