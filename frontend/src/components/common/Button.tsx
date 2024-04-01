import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
  View
} from 'react-native';

interface ButtonPropsType {
  onPress: () => void;
  loading?: boolean;
  classes?: {
    button?: StyleProp<ViewStyle>;
    buttonText?: StyleProp<TextStyle>;
  };
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = ({
  onPress,
  loading,
  classes,
  disabled,
  icon,
  children
}: ButtonPropsType) => {
  return (
    <TouchableOpacity
      style={[classes?.button]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {icon && <View style={{marginRight: 5}}>{icon}</View>}
          <Text style={classes?.buttonText}>{children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
