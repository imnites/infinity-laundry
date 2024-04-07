import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';
import Toast from 'react-native-toast-message';
import {TextField, Button} from '~/components/common';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {QRCodeScannerModule} = NativeModules;

const MachineTab: React.FC = () => {
  const [machineCode, setMachineCode] = useState<string>('');
  const nav = useNavigation();

  const handleQRScan = async () => {
    await QRCodeScannerModule.scan();
  };

  const handleSubmitMachineCode = useCallback(async () => {
    if (machineCode) {
      setMachineCode('');
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
      <Button
        leftIcon={
          <Icon name="qr-code-scanner" style={styles.scannerIcon} size={20} />
        }
        variant="shadow"
        fullWidth
        onPress={handleQRScan}>
        QR SCANNER
      </Button>

      <View style={styles.enterMachineCodeText}>
        <Text style={styles.subTitle}>
          Alternatively, enter the machine code below
        </Text>
        <TextField
          fullWidth
          variant="shadow"
          placeholder="Enter machine code"
          value={machineCode}
          onChangeText={text => setMachineCode(text)}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Button variant="shadow" fullWidth onPress={handleSubmitMachineCode}>
          SUBMIT MACHINE CODE
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff'
  },
  fieldContainer: {
    marginTop: 16,
    marginBottom: 8,
    width: '100%'
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000de',
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000de'
  },
  enterMachineCodeText: {
    marginTop: 40,
    width: '100%'
  },
  scannerIcon: {
    color: '#fff',
    marginRight: 8
  }
});

export default MachineTab;
