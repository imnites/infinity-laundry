import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MachineUsage: React.FC = () => {
  const handleUseMachine = () => {};

  return (
    <>
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleUseMachine}>
            <Text style={styles.buttonText}>Use Machine</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 100,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MachineUsage;
