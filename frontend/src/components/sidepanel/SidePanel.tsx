import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GetInTouchSection} from './get-in-touch-section';
import HelpSection from './help-section/HelpSection';
import AdditionalOptions from './additional-options/AdditionalOptions';
import UserDetails from './user-details/UserDetails';
import {SettingSection} from './setting-section';
import LinearGradient from 'react-native-linear-gradient';

const SidePanel: React.FC = () => (
  <>
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}>
          <UserDetails />
        </LinearGradient>
      </View>
      <View style={styles.remainingDetails}>
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
    flex: 1
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  userDetails: {
    height: '23.8%'
  },
  remainingDetails: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export default SidePanel;
