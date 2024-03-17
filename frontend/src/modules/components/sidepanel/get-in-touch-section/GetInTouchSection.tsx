import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GetInTouchSection: React.FC = () => (
  <>
    <Text style={styles.sectionTitle}>Get in Touch</Text>
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Icon name="document-text-outline" size={24} color="black" />
      <Text style={styles.itemText}>Terms & Conditions</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Icon name="log-out-outline" size={24} color="black" />
      <Text style={styles.itemText}>Log Out</Text>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default GetInTouchSection;
