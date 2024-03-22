import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const GetInTouchSection: React.FC = () => {
  const navigation = useNavigation();

  const onContactUsPress = useCallback(() => {
    (navigation.navigate as any)('ContactUs');
  }, [navigation]);

  return (
    <>
      <Text style={styles.sectionTitle}>Get in Touch</Text>
      <TouchableOpacity style={styles.item} onPress={onContactUsPress}>
        <Icon name="document-text-outline" size={24} color="#f5f5f5" />
        <Text style={styles.itemText}>Contact us</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#f5f5f5',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20
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

export default GetInTouchSection;
