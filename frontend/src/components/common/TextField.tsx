import React, {useCallback, useState} from 'react';
import {StyleProp, StyleSheet, TextInput, TextStyle, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconButton} from './IconButton';

interface TextFieldProps {
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
  onChangeText?: (val: string) => void;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  fullWidth?: boolean;
  variant?: 'shadow' | 'underline';
}

export const TextField: React.FC<TextFieldProps> = ({
  inputStyle,
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
  fullWidth = false,
  variant = 'underline'
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onEyeIconClick = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <View
      style={[
        fullWidth && styles.fullWidth,
        variant === 'shadow' && styles.card,
        variant === 'underline' && styles.underline
      ]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={showPassword ? false : secureTextEntry}
      />
      {secureTextEntry ? (
        <IconButton buttonStyle={styles.iconButton}>
          <Icon
            onPress={onEyeIconClick}
            size={20}
            name={showPassword ? 'eye-off' : 'eye'}
          />
        </IconButton>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  underline: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#3930d8',
    margin: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 0
  },
  input: {
    width: '100%',
    fontSize: 16,
    paddingRight: 40
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    top: 16
  },
  fullWidth: {
    width: '100%'
  }
});
