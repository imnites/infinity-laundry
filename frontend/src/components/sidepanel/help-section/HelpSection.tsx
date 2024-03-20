import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpSection: React.FC = () => {
  const openYouTubeVideo = () => {
    const videoUrl = 'https://youtu.be/Njv_gczUVBk?si=Dwa4V5cH3ybg8Ke7'; // Right Now --> Sample
    Linking.openURL(videoUrl);
  };

  return (
    <>
      <Text style={styles.sectionTitle}>Help</Text>
      <TouchableOpacity style={styles.item} onPress={openYouTubeVideo}>
        <Icon name="videocam-outline" size={24} color="black" />
        <Text style={styles.itemText}>How To Videos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="book-outline" size={24} color="black" />
        <Text style={styles.itemText}>How To Guides</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="help-circle-outline" size={24} color="black" />
        <Text style={styles.itemText}>FAQs</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16
  }
});

export default HelpSection;
