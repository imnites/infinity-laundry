import React from 'react';
import {Text, TouchableOpacity, StyleSheet, NativeModules} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const GetInTouchSection: React.FC = () => {
  const {SecureStorageModule} = NativeModules;
  const handleLogout = async () => {
    await SecureStorageModule.deleteValue('access-token');
    await SecureStorageModule.deleteValue('token-type');
  };

  return (
    <>
      <Text style={styles.sectionTitle}>Get in Touch</Text>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Icon name="document-text-outline" size={24} color="black" />
        <Text style={styles.itemText}>Terms & Conditions</Text>
      </TouchableOpacity>
      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.button}
        labelStyle={styles.itemText}>
        Log Out
      </Button>
    </>
  );
};

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
  button: {
    marginTop: 10,
  },
});

export default GetInTouchSection;
