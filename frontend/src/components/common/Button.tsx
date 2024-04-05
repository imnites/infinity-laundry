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
}

const Button = ({
  onPress,
  loading,
  classes,
  disabled,
  leftIcon,
  children,
  fullWidth = false
}: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[
        fullWidth && styles.fullWidth,
        styles.buttonRoot,
        classes?.button
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <View style={styles.buttonContentRoot}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          <Text style={classes?.buttonText}>{children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
