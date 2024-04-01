import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {NativeModules} from 'react-native';
import Toast from 'react-native-toast-message';

const {QRCodeScannerModule} = NativeModules;

const MachineTab: React.FC = () => {
  const [machineCode, setMachineCode] = useState<string>('');
  const nav = useNavigation();

  const handleQRScan = async () => {
    await QRCodeScannerModule.scan();
  };

  const handleSubmitMachineCode = useCallback(async () => {
    if (machineCode) {
      (nav.navigate as any)('PreviewOrder', {resourceCode: machineCode});
    } else {
      Toast.show({
        type: 'error',
        text1: 'Enter machine code',
        position: 'bottom'
      });
    }
  }, [machineCode, nav]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan the QR-code of the machine to begin</Text>
      <TouchableOpacity style={styles.button} onPress={handleQRScan}>
        <Text style={styles.buttonText}>USE QR SCANNER</Text>
      </TouchableOpacity>
      <Text style={styles.subTitle}>
        Alternatively, enter the machine code below
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter machine code"
        value={machineCode}
        onChangeText={text => setMachineCode(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmitMachineCode}>
        <Text style={styles.buttonText}>SUBMIT MACHINE CODE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  icon: {
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default MachineTab;
