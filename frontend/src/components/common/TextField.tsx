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
  variant?: 'shadow' | 'underline' | 'outlined';
  showEyeIcon?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  inputRef?: React.LegacyRef<TextInput>;
  readOnly?: boolean;
  editable?: boolean;
  autoFocus?: boolean;
  onFocus?: () => void;
  selectTextOnFocus?: boolean;
  selection?: {start: number; end?: number};
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
  selectTextOnFocus,
  selection
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
        variant === 'outlined' && styles.outlined,
        fullWidth && styles.fullWidth,
        rootStyle
      ]}>
      <TextInput
        style={[
          styles.input,
          variant === 'underline' && styles.textVerticalAlign,
          showEyeIcon && styles.rightPadding,
          inputStyle
        ]}
        placeholder={placeholder}
        placeholderTextColor="#0009"
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
        selection={selection}
      />
      {showEyeIcon && secureTextEntry ? (
        <IconButton buttonStyle={styles.iconButton}>
          <Icon
            onPress={onEyeIconClick}
            size={20}
            name={showPassword ? 'eye-off' : 'eye'}
            style={styles.icon}
          />
        </IconButton>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outlined: {
    borderWidth: 1,
    borderColor: '#3930d8',
    borderRadius: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000000de',
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
    fontFamily: 'lucida grande',
    color: '#000000de'
  },
  rightPadding: {
    paddingRight: 40
  },
  textVerticalAlign: {
    textAlignVertical: 'bottom'
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    top: 16
  },
  fullWidth: {
    width: '100%'
  },
  icon: {
    color: '#0009'
  }
});
