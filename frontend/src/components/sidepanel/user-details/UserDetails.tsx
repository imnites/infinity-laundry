import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserDetails: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name="person-outline" size={50} color="#f5f5f5" />
      </View>
      <View>
        <Text style={styles.name}>Nitesh Kumar</Text>
        <Text style={styles.email}>nitesh@gmail.com</Text>
        <Text style={styles.phoneNumber}>+91 9876542254</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  icon: {
    marginTop: 25,
    marginBottom: 10
  },
  name: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: 'bold'
  },
  email: {
    color: '#f5f5f5',
    fontSize: 14,
    marginTop: 5
  },
  phoneNumber: {
    color: '#f5f5f5',
    fontSize: 12,
    marginTop: 5
  }
});

export default UserDetails;
