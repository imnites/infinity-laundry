import React, {useCallback, useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconButton} from './IconButton';

interface TextFieldProps {
  rootStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
  onChangeText?: (val: string) => void;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  fullWidth?: boolean;
  variant?: 'shadow' | 'underline' | 'outline';
  showEyeIcon?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  inputRef?: React.LegacyRef<TextInput>;
  readOnly?: boolean;
  editable?: boolean;
  autoFocus?: boolean;
  onFocus?: () => void;
  selectTextOnFocus?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  rootStyle,
  inputStyle,
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
  fullWidth = false,
  variant = 'underline',
  showEyeIcon,
  maxLength,
  keyboardType,
  inputRef,
  readOnly,
  editable,
  autoFocus,
  onFocus: onFocusCallback,
  selectTextOnFocus
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onEyeIconClick = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onFocus = useCallback(() => {
    setShowPassword(false);
    onFocusCallback && onFocusCallback();
  }, [onFocusCallback]);

  return (
    <View
      style={[
        variant === 'shadow' && styles.card,
        variant === 'underline' && styles.underline,
        variant === 'outline' && styles.outline,
        fullWidth && styles.fullWidth,
        rootStyle
      ]}>
      <TextInput
        style={[styles.input, showEyeIcon && styles.rightPadding, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={showPassword ? false : secureTextEntry}
        onFocus={onFocus}
        maxLength={maxLength}
        keyboardType={keyboardType}
        ref={inputRef}
        readOnly={readOnly}
        editable={editable}
        autoFocus={autoFocus}
        selectTextOnFocus={selectTextOnFocus}
      />
      {showEyeIcon && secureTextEntry ? (
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
  outline: {
    borderWidth: 1,
    borderColor: '#3930d8',
    borderRadius: 16
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
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
    fontFamily: 'lucida grande'
  },
  rightPadding: {
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
