import React, {useCallback} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useResourceDetails} from './useResourceDetails';
import BackButton from '~/components/common/BackButton';
import {Money, Redirect, Button} from '~/components/common';
import {useMeContext} from '~/me';
import useUseResource from './useUseResource';

interface PreviewOrderProps {
  route: any;
}

export const PreviewOrder: React.FC<PreviewOrderProps> = ({route}) => {
  const {me, refresh} = useMeContext();
  const navigation = useNavigation();
  const proceedToUse = useUseResource();
  const {loading, resourceDetails} = useResourceDetails({
    code: route?.params?.resourceCode
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleUseResource = useCallback(
    async (code: string) => {
      const d = await proceedToUse(code);
      if (d && d.transactionId && d.status === 'SUCCESS') {
        await (refresh && refresh());

        (navigation.navigate as any)('Status', {
          transactionId: d.transactionId
        });
      }
    },
    [navigation.navigate, proceedToUse, refresh]
  );

  if (!loading && !resourceDetails) {
    return <Redirect to="MainPage" />;
  }

  if (!me) {
    return <Redirect to="LoginPage" />;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.backButton}>
        <BackButton size={35} handleBackPress={handleBackPress} />
      </View>
      <View>
        <View style={styles.content}>
          <Money
            amountStyle={styles.title}
            currencyStyle={styles.title}
            amount={me.balance}
          />
          <Text style={styles.subtitle}>Current Balance</Text>
        </View>
        <View>
          <Text>Charges Details</Text>
          <Text>{`name: ${resourceDetails.name}`}</Text>
          <Text>{`code: ${resourceDetails.code}`}</Text>
          <Text>{`maxCapacity: ${resourceDetails.maxCapacity}`}</Text>
          <Text>charge per use</Text>
          <Money amount={resourceDetails.amountPerUse} />
          <Text>Total Price</Text>
          <Money amount={resourceDetails.amountPerUse} />
          <Button
            name="Pay and Use"
            onPress={() => handleUseResource(resourceDetails.code)}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 20
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black'
  },
  subtitle: {
    fontSize: 16
  },
  content: {
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PreviewOrder;
