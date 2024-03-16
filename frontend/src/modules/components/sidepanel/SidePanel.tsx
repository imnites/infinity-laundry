import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HomeSection} from './home-section';
import {ProfileSection} from './profile-section';
import {GetInTouchSection} from './get-in-touch-section';
import HelpSection from './help-section/HelpSection';

const SidePanel: React.FC = () => (
  <View style={styles.container}>
    <HomeSection />
    <ProfileSection />
    <HelpSection />
    <GetInTouchSection />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default SidePanel;
