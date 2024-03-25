import React from 'react';
import {View, StyleSheet} from 'react-native';
import Dialog from 'react-native-dialog';

interface FilterDialogPropsType {
  visible: any;
  setVisible: any;
}

const FilterDialog: React.FC = ({
  visible,
  setVisible
}: FilterDialogPropsType) => {
  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Date</Dialog.Title>
        <Dialog.Button label="CANCEL" onPress={handleCancel} />
        <Dialog.Button label="SAVE" onPress={handleOk} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default FilterDialog;
