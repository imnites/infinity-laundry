import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';

const AdditionalOptions: React.FC = () => (
  <View style={styles.root}>
    <Divider />
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="document-text-outline" size={24} color="black" />
        <Text style={styles.itemText}>Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="document-text-outline" size={24} color="black" />
        <Text style={styles.itemText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20
  },
  root: {
    position: 'absolute',
    bottom: 0
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

export default AdditionalOptions;
