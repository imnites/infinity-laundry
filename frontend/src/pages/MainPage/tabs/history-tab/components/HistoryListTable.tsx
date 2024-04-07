import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import moment from 'moment';
import {Money} from '~/components/common';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

interface HistoryListTablePropsType {
  pageOfTransactions: any;
  loading: any;
}

const HistoryListTable: React.FC<HistoryListTablePropsType> = ({
  pageOfTransactions,
  loading
}) => {
  const renderShimmerPlaceholder = () => (
    <>
      {Array.from({length: 5}).map((_, index) => (
        <View key={index} style={{height: 100, marginBottom: 8}}>
          <ShimmerPlaceHolder
            style={{height: 100, width: '100%', marginBottom: 8}}
          />
        </View>
      ))}
    </>
  );

  if (loading) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={renderShimmerPlaceholder}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        onEndReachedThreshold={0.1}
      />
    );
  }

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

  return (
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
        <View style={styles.noTransactionsContainer}>
          <Text style={styles.noTransactionsText}>No transactions</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  noTransactionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  noTransactionsText: {
    fontSize: 18,
    color: '#999'
  }
});

export default HistoryListTable;
