import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const usePersonalDetailsStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#3930d8',
    },
    input: {
      width: '80%',
      backgroundColor: 'transparent',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    error: {
      color: theme.colors.error,
      marginBottom: 10,
      marginTop: -10,
      alignSelf: 'flex-start',
      marginLeft: 35,
    },
    continueButton: {
      marginTop: 20,
      width: '80%',
      backgroundColor: '#3930d8',
      borderRadius: 5,
    },
    continueButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });
};

export default usePersonalDetailsStyles;
