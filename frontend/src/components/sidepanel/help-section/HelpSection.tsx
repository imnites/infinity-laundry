import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpSection: React.FC = () => {
  const navigation = useNavigation();
  const onHowToVideosPress = () => {
    const videoUrl = 'https://youtu.be/Njv_gczUVBk?si=Dwa4V5cH3ybg8Ke7'; // Right Now --> Sample
    Linking.openURL(videoUrl);
  };

  const onFaqsPress = () => {
    (navigation as any).navigate('Faqs');
  };

  return (
    <>
      <Text style={styles.sectionTitle}>Help</Text>
      <TouchableOpacity style={styles.item} onPress={onHowToVideosPress}>
        <Icon name="videocam-outline" size={24} color="#f5f5f5" />
        <Text style={styles.itemText}>How To Videos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="book-outline" size={24} color="#f5f5f5" />
        <Text style={styles.itemText}>How To Guides</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onFaqsPress}>
        <Icon name="help-circle-outline" size={24} color="#f5f5f5" />
        <Text style={styles.itemText}>FAQs</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#f5f5f5',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  itemText: {
    color: '#f5f5f5',
    fontSize: 14,
    marginLeft: 10
  }
});

export default HelpSection;
