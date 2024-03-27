import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useMeContext} from '~/me';
import Icon from 'react-native-vector-icons/Ionicons';

const UserDetails: React.FC = () => {
  const {me} = useMeContext();
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name="person-outline" size={50} color="#f5f5f5" />
      </View>
      <View>
        <Text style={styles.name}>{`${me?.firstName} ${me?.lastName}`}</Text>
        {me?.email && <Text style={styles.email}>{me.email}</Text>}
        {me?.phoneNumber && (
          <Text
            style={
              styles.phoneNumber
            }>{`${me?.phoneNumber?.countryCode} ${me?.phoneNumber?.phoneNumber}`}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
