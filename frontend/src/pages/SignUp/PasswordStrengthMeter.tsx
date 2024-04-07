import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {passwordStrength} from '~/utils';

const getStylesForStrength = (strength: number) => {
  let style;
  let label;
  let key;
  if (strength <= 4) {
    style = styles.weak;
    label = 'Weak';
    key = 'WEAK';
  }

  if (strength > 4 && strength <= 6) {
    style = styles.fair;
    label = 'Fair';
    key = 'FAIR';
  }

  if (strength > 6 && strength <= 8) {
    style = styles.good;
    label = 'Good';
    key = 'GOOD';
  }

  if (strength > 8) {
    style = styles.excellent;
    label = 'Excellent';
    key = 'EXCELLENT';
  }

  return {style, label, key};
};

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password
}) => {
  const [strength, setStrength] = useState(0);

  const {label, style, key} = useMemo(
    () => getStylesForStrength(strength),
    [strength]
  );

  useEffect(() => {
    setStrength(passwordStrength(password));
  }, [password]);

  return (
    <>
      <View style={styles.labelContainer}>
        <Text style={[styles.strengthLabel, {color: style?.backgroundColor}]}>
          {label}
        </Text>
      </View>
      <View style={styles.root}>
        <View
          style={[
            styles.level,
            ['GOOD', 'EXCELLENT', 'FAIR', 'WEAK'].includes(key ?? '') && style
          ]}
        />
        <View
          style={[
            styles.level,
            ['GOOD', 'EXCELLENT', 'FAIR'].includes(key ?? '') && style
          ]}
        />
        <View
          style={[
            styles.level,
            ['GOOD', 'EXCELLENT'].includes(key ?? '') && style
          ]}
        />
        <View style={[styles.level, key === 'EXCELLENT' && style]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  level: {
    backgroundColor: '#e0e0e0',
    height: 4,
    borderRadius: 8,
    width: '24%'
  },
  labelContainer: {
    width: '100%',
    marginTop: 4
  },
  strengthLabel: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right'
  },
  weak: {backgroundColor: 'red'},
  fair: {backgroundColor: 'orange'},
  good: {backgroundColor: '#59E659'},
  excellent: {backgroundColor: '#19A519'}
});
