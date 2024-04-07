import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  StyleSheet
} from 'react-native';

interface ButtonPropsType {
  onPress: () => void;
  loading?: boolean;
  classes?: {
    button?: StyleProp<ViewStyle>;
    buttonText?: StyleProp<TextStyle>;
  };
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'text' | 'contained' | 'outlined' | 'shadow';
}

const Button = ({
  onPress,
  loading,
  classes,
  disabled,
  leftIcon,
  children,
  fullWidth = false,
  variant = 'text'
}: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonRoot,
        variant === 'contained' && styles.contained,
        variant === 'shadow' && styles.shadow,
        variant === 'outlined' && styles.outlined,
        variant === 'text' && styles.text,
        fullWidth && styles.fullWidth,
        classes?.button
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <View style={styles.buttonContentRoot}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          <Text
            style={[
              variant === 'contained' && styles.containedText,
              variant === 'shadow' && styles.shadowText,
              variant === 'outlined' && styles.outlinedText,
              variant === 'text' && styles.textContent,
              classes?.buttonText
            ]}>
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containedText: {
    color: '#ffffff'
  },
  contained: {backgroundColor: '#3930d8', padding: 8, borderRadius: 16},
  outlinedText: {
    color: '#3930d8'
  },
  outlined: {
    borderWidth: 1,
    padding: 8,
    borderColor: '#3930d8',
    borderRadius: 16
  },
  text: {color: '#3930d8'},
  shadow: {
    backgroundColor: '#3930d8',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000000de',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadowText: {color: '#fff'},
  textContent: {color: '#3930d8'},
  buttonRoot: {},
  fullWidth: {width: '100%'},
  buttonContentRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftIconContainer: {marginRight: 5}
});

export default Button;
