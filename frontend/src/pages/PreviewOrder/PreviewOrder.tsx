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
    <View style={styles.container}>
      <BackButton size={35} handleBackPress={handleBackPress} />

      <View style={styles.content}>
        <Text style={styles.title}>Current Balance</Text>
        <Money
          amountStyle={styles.balanceAmount}
          currencyStyle={styles.balanceCurrency}
          amount={me.balance}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Charge Details</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>Name: {resourceDetails.name}</Text>
          <Text style={styles.detailText}>Code: {resourceDetails.code}</Text>
          <Text style={styles.detailText}>
            Max Capacity: {resourceDetails.maxCapacity}
          </Text>
          <Text style={styles.detailText}>Charge Per Use:</Text>
          <Money amount={resourceDetails.amountPerUse} />
          <Text style={styles.detailText}>Total Price:</Text>
          <Money amount={resourceDetails.amountPerUse} />
        </View>
      </View>

      <Button
        classes={{button: styles.button}}
        onPress={() => handleUseResource(resourceDetails.code)}>
        Pay and Use
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  backButton: {
    marginBottom: 20
  },
  content: {
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  balanceCurrency: {
    fontSize: 14
  },
  detailsContainer: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  details: {
    marginBottom: 10
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PreviewOrder;
