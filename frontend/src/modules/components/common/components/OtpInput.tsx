import React, {useState, useCallback} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const digitRegex = new RegExp('^[0-9]$|^$');

interface TextFieldProps {
  onChangeText?: (value: string) => void;
  value: string | undefined;
  focus: boolean;
  editable: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChangeText,
  focus,
  editable,
}) => {
  const ref = React.createRef<TextInput>();

  React.useEffect(() => {
    focus && ref && ref.current && ref.current.focus();
  }, [focus, ref]);

  return (
    <TextInput
      style={styles.box}
      maxLength={1}
      keyboardType="number-pad"
      onChangeText={onChangeText}
      value={value}
      ref={ref}
      editable={editable}
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
  editable,
}) => {
  const [otp, setOtp] = useState(
    Array(otpLength)
      .fill('')
      .map((_, i) => ({val: '', focus: i === 0})),
  );

  const onChangeText = useCallback(
    (index: number) => (newVal: string) => {
      if (digitRegex.test(newVal)) {
        const newOTPVal = otp.map((val, i) => ({
          val: i === index ? newVal : val.val,
          focus: newVal ? i === index + 1 : val.val ? i === index - 1 : false,
        }));

        setOtp(newOTPVal);

        if (onOTPChange) {
          onOTPChange(newOTPVal.map(({val}) => val).join(''));
        }
      }
    },
    [onOTPChange, otp],
  );

  return (
    <View style={styles.container}>
      {otp.map(({val, focus}, index) => (
        <TextField
          key={index}
          value={val}
          onChangeText={onChangeText(index)}
          focus={focus}
          editable={editable}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: '#3930d8',
    width: 40,
    height: 40,
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 12,
  },
});
export default OtpInput;
