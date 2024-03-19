import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileSection: React.FC = () => (
  <>
    <Text style={styles.sectionTitle}>Profile</Text>
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Icon name="person-outline" size={24} color="black" />
      <Text style={styles.itemText}>Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Icon name="lock-closed-outline" size={24} color="black" />
      <Text style={styles.itemText}>Change Password</Text>
    </TouchableOpacity>
  </>
);

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

export default ProfileSection;
