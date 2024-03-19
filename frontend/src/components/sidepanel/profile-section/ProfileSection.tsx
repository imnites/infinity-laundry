import React, {useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeModules} from 'react-native';

const {SecureStorageModule} = NativeModules;

const ProfileSection: React.FC = () => {
  const navigation = useNavigation();

  const onProfilePress = useCallback(async () => {
    (navigation.navigate as any)('ProfileDetailsPage');
  }, [navigation.navigate]);

  const onChangePasswordPress = useCallback(async () => {
    const accessToken = await SecureStorageModule.getValue('access-token');
    (navigation.navigate as any)('ResetPassword', {
      parent: 'ProfileSection',
      accessToken
    });
  }, [navigation.navigate]);

  return (
    <>
      <Text style={styles.sectionTitle}>Profile</Text>
      <TouchableOpacity style={styles.item} onPress={onProfilePress}>
        <Icon name="person-outline" size={24} color="black" />
        <Text style={styles.itemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onChangePasswordPress}>
        <Icon name="lock-closed-outline" size={24} color="black" />
        <Text style={styles.itemText}>Change Password</Text>
      </TouchableOpacity>
    </>
  );
};

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
