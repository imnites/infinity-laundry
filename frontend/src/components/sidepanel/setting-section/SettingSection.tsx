import React, {useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ProfileSection: React.FC = () => {
  const navigation = useNavigation();
  const onChangePasswordPress = useCallback(async () => {
    (navigation.navigate as any)('ResetPassword', {
      parent: 'ProfileSection'
    });
  }, [navigation.navigate]);

  return (
    <>
      <Text style={styles.sectionTitle}>Setting</Text>
      <TouchableOpacity style={styles.item} onPress={onChangePasswordPress}>
        <Icon name="lock-closed-outline" size={24} color="#f5f5f5" />
        <Text style={styles.itemText}>Change Password</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#f5f5f5',
    fontSize: 18,
    marginBottom: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  itemText: {
    color: '#f5f5f5',
    fontSize: 14,
    marginLeft: 10
  }
});

export default ProfileSection;
