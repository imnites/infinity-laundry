import React, {useCallback, useState, createRef, useMemo} from 'react';
import {StyleProp, TextInput, TextStyle} from 'react-native';
import {useNumberFormat} from '~/hooks/common';

interface NumericInputProps {
  onChangeText: (value: number | null) => void;
  value: number | null;
  placeholder?: string | undefined;
  style?: StyleProp<TextStyle>;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  onChangeText: onChange,
  value: initialValue,
  placeholder,
  style
}) => {
  const ref = createRef<TextInput>();
  const [value, setValue] = useState<number | null>(initialValue);

  const {
    formatNumberWithoutRemovingLeadingDecimalSeperator,
    parseNumber,
    maximumFractionDigits
  } = useNumberFormat();

  const onChangeText = useCallback(
    (newValue: string) => {
      if (newValue === '') {
        setValue(null);
        onChange(null);
        return;
      }

      let parsedVal = parseNumber(newValue);

      if (parsedVal.split('.')[1]?.length > maximumFractionDigits) {
        const decimalIndex = parsedVal.indexOf('.');
        parsedVal = parsedVal.substring(
          0,
          decimalIndex + maximumFractionDigits + 1
        );
      }

      const val = parsedVal as any as number;

      if (!isNaN(val)) {
        setValue(val);
        onChange(val);
      }
    },
    [maximumFractionDigits, onChange, parseNumber]
  );

  const text = useMemo(
    () =>
      value !== null && value !== ('' as any as number) && !isNaN(value)
        ? formatNumberWithoutRemovingLeadingDecimalSeperator(value)
        : '',
    [formatNumberWithoutRemovingLeadingDecimalSeperator, value]
  );

  return (
    <TextInput
      value={text}
      selection={{start: text?.length || 0, end: text?.length || 0}}
      onChangeText={onChangeText}
      keyboardType="number-pad"
      placeholder={placeholder}
      ref={ref}
      style={style}
    />
  );
};

export default NumericInput;
