import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useMeContext} from '~/me';

const ProfileDetailsPage = () => {
  const {me} = useMeContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{me?.firstName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{me?.lastName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{me?.email}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{me?.phoneNumber?.phoneNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 16
  }
});

export default ProfileDetailsPage;
