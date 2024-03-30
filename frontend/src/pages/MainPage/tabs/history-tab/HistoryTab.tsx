import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import FilterDialog from './components/FilterDialog';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  machineNumber?: string;
  machineId?: string;
  currency: string;
  timestamp: string;
  status: string;
}

const HistoryTab: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const renderTransactionItem = ({item}: {item: Transaction}) => {
    const inrSymbol = '\u20B9';
    const amountColor =
      item.status === 'Failed'
        ? 'grey'
        : item.type === 'Add funds'
        ? 'green'
        : 'red';
    return (
      <View style={styles.transaction}>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>{item.type}</Text>
          {item.machineId && (
            <Text style={styles.transactionText}>
              Machine ID: {item.machineId}
            </Text>
          )}
          {item.machineNumber && (
            <Text style={styles.transactionText}>
              Machine Number: {item.machineNumber}
            </Text>
          )}
          <Text style={styles.transactionText}>
            {moment(item.timestamp).format('MMMM D, YYYY [at] hh:mm A')}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <View style={styles.amount}>
            <Text style={[styles.amountText, {color: amountColor}]}>
              {item.type === 'Add funds' ? '+' : '-'} {inrSymbol}
              {item.amount}
            </Text>
          </View>
          {item.status === 'Failed' && (
            <View style={styles.failedContainer}>
              <Text style={styles.failedText}>Failed</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterIcon}>
        <Icon name="filter" color="#000" size={24} onPress={showDialog} />
      </View>
      <FilterDialog visible={visible} setVisible={setVisible} />
      <View>
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center'
  },
  amount: {
    marginRight: 8
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold'
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

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'Add funds',
    amount: 500.0,
    currency: 'INR',
    timestamp: '2024-03-20T10:00:00Z',
    status: 'Complete'
  },
  {
    id: '2',
    type: 'Usage',
    machineNumber: 'Machine A',
    machineId: '123456',
    amount: 500.0,
    currency: 'INR',
    timestamp: '2024-03-20T10:30:00Z',
    status: 'Failed'
  },
  {
    id: '3',
    type: 'Add funds',
    amount: -500.0,
    currency: 'INR',
    timestamp: '2024-03-20T10:00:00Z',
    status: 'Failed'
  },
  {
    id: '4',
    type: 'Usage',
    amount: 500.0,
    machineNumber: 'Machine A',
    machineId: '123456',
    currency: 'INR',
    timestamp: '2024-03-20T10:30:00Z',
    status: 'Complete'
  },
  {
    id: '5',
    type: 'Add funds',
    amount: 500.0,
    currency: 'INR',
    timestamp: '2024-03-20T10:00:00Z',
    status: 'Failed'
  },
  {
    id: '6',
    type: 'Usage',
    amount: 500.0,
    machineNumber: 'Machine A',
    machineId: '123456',
    currency: 'INR',
    timestamp: '2024-03-20T10:30:00Z',
    status: 'Complete'
  },
  {
    id: '7',
    type: 'Add funds',
    amount: 500.0,
    currency: 'INR',
    timestamp: '2024-03-20T10:00:00Z',
    status: 'Failed'
  },
  {
    id: '8',
    type: 'Usage',
    amount: 500.0,
    machineNumber: 'Machine A',
    machineId: '123456',
    currency: 'INR',
    timestamp: '2024-03-20T10:30:00Z',
    status: 'Complete'
  }
];
