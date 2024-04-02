import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Dialog from 'react-native-dialog';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

interface FilterDialogPropsType {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<
    React.SetStateAction<{startDate: Date | null; endDate: Date | null}>
  >;
}

const FilterDialog: React.FC<FilterDialogPropsType> = ({
  visible,
  setVisible,
  setDate
}) => {
  const [datePickerVisibility, setDatePickerVisibility] = useState({
    isStartDatePickerVisible: false,
    isEndDatePickerVisible: false
  });
  const [selectedDate, setSelectedDate] = useState({
    selectedStartDate: null as Date | null,
    selectedEndDate: null as Date | null
  });

  const showDatePicker = (
    pickerType: 'isStartDatePickerVisible' | 'isEndDatePickerVisible'
  ) => {
    setDatePickerVisibility(prevState => ({
      ...prevState,
      [pickerType]: true
    }));
  };

  const hideDatePicker = (
    pickerType: 'isStartDatePickerVisible' | 'isEndDatePickerVisible'
  ) => {
    setDatePickerVisibility(prevState => ({
      ...prevState,
      [pickerType]: false
    }));
  };

  const handleCancel = () => {
    setVisible(false);
    setDatePickerVisibility({
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false
    });
    setSelectedDate({
      selectedStartDate: null as Date | null,
      selectedEndDate: null as Date | null
    });
  };

  const handleConfirm = (
    date: Date,
    pickerType: 'selectedStartDate' | 'selectedEndDate'
  ) => {
    hideDatePicker(
      pickerType === 'selectedStartDate'
        ? 'isStartDatePickerVisible'
        : 'isEndDatePickerVisible'
    );
    setSelectedDate(prevState => ({
      ...prevState,
      [pickerType]: date
    }));
  };

  const handleSave = useCallback(() => {
    setDate(prevDetails => ({
      ...prevDetails,
      startDate: selectedDate.selectedStartDate,
      endDate: selectedDate.selectedEndDate
    }));
    setVisible(false);
  }, [
    selectedDate.selectedEndDate,
    selectedDate.selectedStartDate,
    setDate,
    setVisible
  ]);

  const formattedDate = (date: Date | null, type: String) => {
    return date
      ? `${date.getDate()} ${date.toLocaleString('default', {
          month: 'short'
        })} ${date.getFullYear()}`
      : type;
  };

  const disabled = !(
    selectedDate.selectedStartDate && selectedDate.selectedEndDate
  );

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <View style={styles.inputContainer}>
          <View style={styles.dateInput}>
            <View style={styles.startDate}>
              <Icon name="calendar" size={24} color="#3930d8" />
              <TouchableOpacity
                onPress={() => showDatePicker('isStartDatePickerVisible')}
                style={styles.inputField}>
                <Text style={styles.inputText}>
                  {formattedDate(selectedDate.selectedStartDate, 'Start Date')}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={datePickerVisibility.isStartDatePickerVisible}
                mode="date"
                onConfirm={date => handleConfirm(date, 'selectedStartDate')}
                onCancel={() => hideDatePicker('isStartDatePickerVisible')}
                maximumDate={selectedDate.selectedEndDate}
                date={selectedDate.selectedStartDate || new Date()}
              />
            </View>
            <Text style={styles.spaceBetween} />
            <View style={styles.verticalLine} />
            <Text style={styles.spaceBetween} />
            <View style={styles.endDate}>
              <Icon name="calendar" size={24} color="#3930d8" />
              <TouchableOpacity
                onPress={() => showDatePicker('isEndDatePickerVisible')}
                style={styles.inputField}>
                <Text style={styles.inputText}>
                  {formattedDate(selectedDate.selectedEndDate, 'End Date')}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={datePickerVisibility.isEndDatePickerVisible}
                mode="date"
                onConfirm={date => handleConfirm(date, 'selectedEndDate')}
                onCancel={() => hideDatePicker('isEndDatePickerVisible')}
                minimumDate={selectedDate.selectedStartDate}
                date={selectedDate.selectedEndDate || new Date()}
              />
            </View>
          </View>
        </View>
        <Dialog.Button
          label="CANCEL"
          onPress={handleCancel}
          style={styles.actionButton}
        />
        <Dialog.Button
          label="SAVE"
          onPress={handleSave}
          style={disabled ? {color: 'grey'} : styles.actionButton}
          disabled={disabled}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  inputContainer: {
    marginBottom: 10
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  startDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    width: '39%'
  },
  endDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    width: '39%'
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  inputText: {
    marginRight: 10,
    color: '#3930d8'
  },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: 'black'
  },
  spaceBetween: {
    width: '3%'
  },
  actionButton: {
    color: '#3930d8'
  }
});

export default FilterDialog;
