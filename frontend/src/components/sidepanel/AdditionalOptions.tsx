import React, {useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
import {useLogout} from '~/hooks';
import {useMeContext} from '~/me';
import {useNavigation} from '@react-navigation/native';

const AdditionalOptions: React.FC = () => {
  const {setMe} = useMeContext();
  const navigation = useNavigation();

  const onSuccess = useCallback(() => {
    setMe && setMe(undefined);
    (navigation.navigate as any)('LoginPage');
  }, [navigation, setMe]);

  const onError = useCallback(() => {
    setMe && setMe(undefined);
    (navigation.navigate as any)('LoginPage');
  }, [navigation, setMe]);

  const {logout} = useLogout();

  const onTermsAndConditionsClick = useCallback(() => {
    (navigation.navigate as any)('TermsAndConditions');
  }, [navigation.navigate]);

  const onLogoutClick = useCallback(() => {
    logout(onSuccess, onError);
  }, [logout, onError, onSuccess]);

  return (
    <View style={styles.root}>
      <Divider />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          onPress={onTermsAndConditionsClick}>
          <Icon name="document-text-outline" size={24} color="black" />
          <Text style={styles.itemText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={onLogoutClick}>
          <Icon name="document-text-outline" size={24} color="black" />
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
