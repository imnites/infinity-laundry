import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import moment from 'moment';
import {usePageOfTransactions} from './usePageOfTransactions';
import HistoryHeader from './components/HistoryHeader';
import HistoryListTable from './components/HistoryListTable';

const HistoryTab: React.FC = () => {
  const [date, setFilter] = useState<{
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

  return (
    <View style={styles.container}>
      <HistoryHeader setFilter={setFilter} />
      <HistoryListTable
        pageOfTransactions={pageOfTransactions}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default HistoryTab;
