import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Money, Redirect} from '~/components/common';
import {useNavigation} from '@react-navigation/native';
import {useMeContext} from '~/me';

export const BalanceCard: React.FC = () => {
  const {me} = useMeContext();
  const {navigate} = useNavigation();

  const onAddFundsClick = useCallback(() => {
    (navigate as any)('PaymentPage');
  }, [navigate]);

  if (!me) {
    return <Redirect to="LoginPage" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Money
            amountStyle={styles.title}
            currencyStyle={styles.title}
            amount={me.balance}
          />
          <Text style={styles.subtitle}>Current Balance</Text>
          <Button
            fullWidth
            classes={{
              button: styles.addFundButton,
              buttonText: styles.addFundButtonText
            }}
            variant="contained"
            onPress={onAddFundsClick}>
            Add Money
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 4,
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
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
  addFundButton: {
    width: 240,
    marginTop: 24
  },
  addFundButtonText: {
    fontSize: 16,
    paddingBottom: 2
  }
});

export default BalanceCard;
