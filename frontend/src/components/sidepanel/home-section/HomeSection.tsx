import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';

const HomeSection: React.FC = () => (
  <>
    <Text style={styles.sectionTitle}>Home</Text>
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Icon name="home-outline" size={24} color="black" />
      <Text style={styles.itemText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Icon name="cog" size={24} color="black" />
      <Text style={styles.itemText}>Use Machine</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Icons name="signal" size={24} color="black" />
      <Text style={styles.itemText}>Wash/Dry Status</Text>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
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

export default HomeSection;
