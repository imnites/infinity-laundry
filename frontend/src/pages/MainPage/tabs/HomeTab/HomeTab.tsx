import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AdContent} from './AdContent';
import {BalanceCard} from './BalanceCard';

const HomeTab: React.FC = () => {
  return (
    <View>
      <View style={styles.adContainer}>
        <AdContent />
      </View>
      <View style={styles.balanceContainer}>
        <BalanceCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    padding: 8,
    height: 280
  },
  balanceContainer: {
    marginTop: 40,
    padding: 8
  }
});

export default HomeTab;
