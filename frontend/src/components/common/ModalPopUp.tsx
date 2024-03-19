import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Modal} from 'react-native';

interface ModalPopUpPropsType {
  isInvalidCredentials: boolean;
  setInvalidCredentials: any;
  message: string;
}

const ModalPopUp: React.FC<ModalPopUpPropsType> = ({
  isInvalidCredentials,
  setInvalidCredentials,
  message
}) => {
  return (
    <Modal
      visible={isInvalidCredentials}
      animationType="slide"
      transparent={true}
      onRequestClose={setInvalidCredentials}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity onPress={setInvalidCredentials}>
            <Text style={styles.dismissText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20
  },
  dismissText: {
    color: 'blue',
    fontSize: 16
  }
});

export default ModalPopUp;
