import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const PersonalDetails: React.FC = () => {
  const handleEdit = () => {
    console.log('Use Machine button pressed');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>Sample Name</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>Sample Mail</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account ID:</Text>
            <Text style={styles.text}>12345678</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  text: {
    color: '#333',
  },
  editButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
  },
});

export default PersonalDetails;
