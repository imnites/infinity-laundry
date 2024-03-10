import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StatusTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No status available yet.</Text>
      <Text style={styles.warning}>Warning: No status available yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  warning: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default StatusTab;
