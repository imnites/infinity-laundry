import React from 'react';
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ContactUs: React.FC = () => {
  const email = 'infinitylaundry@gmail.com';
  const phoneNumber = '+1234567890';

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Us</Text>
        </View>
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoItem} onPress={handleEmailPress}>
            <Icon
              name="mail-outline"
              size={24}
              color="#3930d8"
              style={styles.icon}
            />
            <Text style={styles.infoText}>{email}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem} onPress={handlePhonePress}>
            <Icon
              name="call-outline"
              size={24}
              color="#3930d8"
              style={styles.icon}
            />
            <Text style={styles.infoText}>{phoneNumber}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.info}>
          Our dedicated support team is available to assist you with any
          questions or concerns you may have. Feel free to reach out to us via
          email or phone, and we'll get back to you as soon as possible.
        </Text>
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
    padding: 20,
    backgroundColor: '#fff'
  },
  content: {
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 400
  },
  header: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#3930d8',
    marginBottom: 10,
    fontSize: 24
  },
  infoContainer: {
    marginBottom: 30
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  icon: {
    marginRight: 10
  },
  infoText: {
    fontSize: 18,
    color: '#333333',
    textDecorationLine: 'underline'
  },
  info: {
    fontSize: 16,
    lineHeight: 22
  }
});

export default ContactUs;
