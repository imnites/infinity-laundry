import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import FilterDialog from './components/FilterDialog';
import {usePageOfTransactions} from './usePageOfTransactions';
import {Money} from '~/components/common';

const HistoryTab: React.FC = () => {
  const [date, setDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(),
    endDate: new Date()
  });
  const {pageOfTransactions, loading} = usePageOfTransactions({
    dateRange: {
      startDate: moment(date.startDate)
        .subtract(1, 'months')
        .format('YYYY-MM-DDTHH:mm:ssZ'),
      endDate: moment(date.endDate).format('YYYY-MM-DDTHH:mm:ssZ')
    },
    statuses: ['SUCCESS', 'FAILED', 'CANCELLED', 'PENDING']
  });

  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const renderTransactionItem = ({item}: {item: any}) => {
    const amountColor =
      item.status === 'FAILED'
        ? 'grey'
        : item.type === 'CREDIT'
        ? 'green'
        : 'red';

    const amountPrefix = item.type === 'CREDIT' ? '+' : '-';

    return (
      <View style={styles.transaction}>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>{item.type}</Text>
          {item.resource?.code && (
            <Text style={styles.transactionText}>
              Machine ID: {item.resource.code}
            </Text>
          )}
          {item.resource?.name && (
            <Text style={styles.transactionText}>
              Machine Name: {item.resource.name}
            </Text>
          )}
          <Text style={styles.transactionText}>
            {moment(item.transactionCompletionTime).format(
              'MMMM D, YYYY [at] hh:mm A'
            )}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Money
            amount={item.amount}
            prefix={amountPrefix}
            currencyStyle={{
              color: amountColor,
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: -3
            }}
            amountStyle={{
              color: amountColor,
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: 10
            }}
          />
          {item.status === 'FAILED' && (
            <View style={styles.failedContainer}>
              <Text style={styles.failedText}>Failed</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterIcon}>
        <Icon name="filter" color="#000" size={24} onPress={showDialog} />
      </View>
      <FilterDialog
        visible={visible}
        setVisible={setVisible}
        setDate={setDate}
      />
      <View>
        {pageOfTransactions && pageOfTransactions.length > 0 ? (
          <FlatList
            data={pageOfTransactions}
            renderItem={renderTransactionItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            onEndReachedThreshold={0.1}
          />
        ) : (
          <Text>No transactions</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#fff'
  },
  filterIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12
  },
  transactionType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e1e1e',
    marginBottom: 4
  },
  transactionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4
  },
  transactionDetails: {
    flex: 1
  },
  amountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  failedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4
  },
  failedText: {
    color: 'red',
    fontSize: 12
  }
});

export default HistoryTab;
