import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TextWithLine: React.FC<{text: string}> = ({text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black'
  },
  text: {
    marginHorizontal: 10,
    color: 'black',
    fontWeight: 'bold'
  }
});

export default TextWithLine;
