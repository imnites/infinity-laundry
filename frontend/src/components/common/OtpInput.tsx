import React, {useState, useCallback} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {TextField} from '.';

const digitRegex = new RegExp('^[0-9]$|^$');

interface TextFieldProps {
  onChangeText?: (value: string) => void;
  value: string | undefined;
  focus: boolean;
  editable: boolean;
  onFocus: () => void;
}

const OtpInputField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  focus,
  editable,
  onFocus
}) => {
  const ref = React.createRef<TextInput>();

  React.useEffect(() => {
    focus && ref && ref.current && ref.current.focus();
  }, [focus, ref]);

  return (
    <TextField
      inputStyle={styles.input}
      rootStyle={styles.inputRoot}
      maxLength={1}
      keyboardType="number-pad"
      onChangeText={onChangeText}
      value={value}
      inputRef={ref}
      editable={editable}
      variant="shadow"
      selectTextOnFocus
      onFocus={onFocus}
    />
  );
};

interface OTPInputProps {
  otpLength: number;
  onOTPChange: (value: string) => void;
  editable: boolean;
}

const OtpInput: React.FC<OTPInputProps> = ({
  otpLength,
  onOTPChange,
  editable
}) => {
  const [otp, setOtp] = useState(
    Array(otpLength)
      .fill('')
      .map((_, i) => ({val: '', focus: i === 0}))
  );

  const onFocus = useCallback(
    (index: number) => () => {
      const newOTPVal = otp.map((val, i) => ({
        ...val,
        focus: i === index
      }));

      setOtp(newOTPVal);
    },
    [otp]
  );

  const onChangeText = useCallback(
    (index: number) => (newVal: string) => {
      if (digitRegex.test(newVal)) {
        const newOTPVal = otp.map((val, i) => ({
          val: i === index ? newVal : val.val,
          focus: newVal ? i === index + 1 : val.val ? i === index - 1 : false
        }));

        setOtp(newOTPVal);

        if (onOTPChange) {
          onOTPChange(newOTPVal.map(({val}) => val).join(''));
        }
      }
    },
    [onOTPChange, otp]
  );

  return (
    <View style={styles.container}>
      {otp.map(({val, focus}, index) => (
        <OtpInputField
          key={index}
          value={val}
          onChangeText={onChangeText(index)}
          focus={focus}
          editable={editable}
          onFocus={onFocus(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    textAlign: 'center'
  },
  inputRoot: {
    width: 48,
    height: 48,
    marginRight: 4,
    marginLeft: 4,
    borderRadius: 20
  }
});
export default OtpInput;
