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

  const onAddFundsClick = useCallback(() => {
    (navigation.navigate as any)('PaymentPage');
  }, [navigation]);

  const handleUseResource = useCallback(async () => {
    const d = await proceedToUse(resourceDetails?.code);
    if (d && d.transactionId && d.status === 'SUCCESS') {
      await (refresh && refresh());
      (navigation.navigate as any)('Status', {transactionId: d.transactionId});
    }
  }, [navigation, proceedToUse, refresh, resourceDetails?.code]);

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

  const canUseResource =
    me.balance.amount >= resourceDetails.amountPerUse.amount;

  return (
    <View style={styles.container}>
      <BackButton size={35} handleBackPress={handleBackPress} />
      <View style={styles.content}>
        <Money
          amountStyle={styles.balance}
          currencyStyle={styles.balance}
          amount={me.balance}
        />
        <Text style={styles.title}>Current Balance</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Usage Details</Text>
        <View style={styles.details}>
          <DetailRow label="Machine Name" value={resourceDetails.name} />
          <DetailRow label="Code" value={resourceDetails.code} />
          <DetailRow label="Max Capacity" value={resourceDetails.maxCapacity} />
          <DetailRow label="Charge Per Use">
            <Money
              rootStyle={styles.balanceAmountRoot}
              amount={resourceDetails.amountPerUse}
              amountStyle={styles.balanceAmount}
              currencyStyle={styles.balanceCurrency}
            />
          </DetailRow>
          <DetailRow label="Total Price">
            <Money
              rootStyle={styles.balanceAmountRoot}
              amount={resourceDetails.amountPerUse}
              amountStyle={styles.balanceAmount}
              currencyStyle={styles.balanceCurrency}
            />
          </DetailRow>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          variant="shadow"
          fullWidth
          onPress={canUseResource ? handleUseResource : onAddFundsClick}>
          {canUseResource ? 'Pay and Use' : 'Add Money'}
        </Button>
      </View>
      {!canUseResource && (
        <Text style={styles.warningText}>
          You're short on balance. Please add Money to proceed.
        </Text>
      )}
    </View>
  );
};

const DetailRow: React.FC<{
  label: string;
  value?: string | number;
  children?: React.ReactNode;
}> = ({label, value, children}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    {value ? <Text style={styles.detailValue}>{value}</Text> : children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    width: '100%'
  },
  content: {
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    color: '#0009'
  },
  balance: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black'
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333'
  },
  details: {
    marginBottom: 10
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '80%',
    maxWidth: 280
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left'
  },
  button: {
    width: 240,
    backgroundColor: '#3930d8',
    borderRadius: 16,
    marginTop: 24
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  balanceAmount: {
    fontSize: 16,
    color: '#333'
  },
  balanceAmountRoot: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 0,
    marginRight: 0
  },
  balanceCurrency: {
    fontSize: 16,
    color: '#333'
  },
  warningText: {
    marginTop: 10,
    color: 'red',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default PreviewOrder;
