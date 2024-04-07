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
        <Text style={styles.sectionTitle}>Charge Details</Text>
        <View style={styles.details}>
          <DetailRow label="Name" value={resourceDetails.name} />
          <DetailRow label="Code" value={resourceDetails.code} />
          <DetailRow label="Max Capacity" value={resourceDetails.maxCapacity} />
          <DetailRow label="Charge Per Use">
            <Money
              amount={resourceDetails.amountPerUse}
              amountStyle={styles.balanceAmount}
              currencyStyle={styles.balanceCurrency}
            />
          </DetailRow>
          <DetailRow label="Total Price">
            <Money
              amount={resourceDetails.amountPerUse}
              amountStyle={styles.balanceAmount}
              currencyStyle={styles.balanceCurrency}
            />
          </DetailRow>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          classes={{
            button: styles.button,
            buttonText: styles.buttonText
          }}
          onPress={canUseResource ? handleUseResource : onAddFundsClick}>
          {canUseResource ? 'Pay and Use' : 'Add Money'}
        </Button>
      </View>
      {!canUseResource && (
        <Text style={styles.warningText}>
          You're short on balance. Please add funds to proceed.
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
    <View style={styles.detailValueContainer}>
      {value ? (
        <Text style={styles.detailValue}>{value}</Text>
      ) : (
        <Text style={styles.detailValue}>{children}</Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  content: {
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333'
  },
  balance: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333'
  },
  detailsContainer: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  details: {
    marginBottom: 10
  },
  buttonContainer: {
    alignSelf: 'center'
  },
  detailValueContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10
  },
  detailValue: {
    fontSize: 16,
    color: '#333'
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
    paddingVertical: 10,
    fontSize: 18
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
