import React from 'react';
import {View, StyleSheet} from 'react-native';
import {UserDetails} from './user-details';
import {GetInTouchSection} from './get-in-touch-section';
import HelpSection from './help-section/HelpSection';
import AdditionalOptions from './additional-options/AdditionalOptions';
import Header from './user-details/UserDetails';
import {SettingSection} from './setting-section';

const SidePanel: React.FC = () => (
  <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.remainingDetails}>
        <UserDetails />
        <SettingSection />
        <HelpSection />
        <GetInTouchSection />
        <AdditionalOptions />
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF000080'
  },
  header: {
    height: '25%'
  },
  remainingDetails: {
    paddingVertical: 20,
    paddingHorizontal: 10
  }
});

export default SidePanel;
