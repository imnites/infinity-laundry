import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ProfileSection} from './profile-section';
import {GetInTouchSection} from './get-in-touch-section';
import HelpSection from './help-section/HelpSection';
import {Divider} from 'react-native-paper';
import AdditionalOptions from './AdditionalOptions';

const SidePanel: React.FC = () => (
  <View style={styles.container}>
    <ProfileSection />
    <Divider />
    <HelpSection />
    <Divider />
    <GetInTouchSection />
    <AdditionalOptions />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10
  }
});

export default SidePanel;
