import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FilterDialog from '../components/FilterDialog';

interface HistoryHeaderPropsType {
  setFilter: React.Dispatch<
    React.SetStateAction<{startDate: Date | null; endDate: Date | null}>
  >;
}

const HistoryHeader: React.FC<HistoryHeaderPropsType> = ({setFilter}) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  return (
    <View>
      <View style={styles.filterIcon}>
        <Icon name="filter" color="#000" size={24} onPress={showDialog} />
      </View>
      <FilterDialog
        visible={visible}
        setVisible={setVisible}
        setFilter={setFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16
  }
});

export default HistoryHeader;
