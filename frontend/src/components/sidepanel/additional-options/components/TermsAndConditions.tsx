import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';

const TermsAndConditions: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Title style={styles.titleText}>Terms and Conditions</Title>

        <Text style={styles.paragraph}>
          Welcome to Infinity Laundry! These terms and conditions outline the
          rules and regulations for the use of our laundry services.
        </Text>

        <Text style={styles.paragraph}>
          By accessing this website and using our services, we assume you accept
          these terms and conditions. Do not continue to use Infinity Laundry if
          you do not agree to all of the terms and conditions stated on this
          page.
        </Text>

        <Text style={styles.sectionTitle}>1. Services</Text>
        <Text style={styles.sectionText}>
          Infinity Laundry provides laundry services for residents of
          participating properties. Users can access our services through our
          mobile application or laundry machines equipped with Infinity Laundry
          technology.
        </Text>

        <Text style={styles.sectionTitle}>2. Registration</Text>
        <Text style={styles.sectionText}>
          Users must register an account through our mobile application to
          access our services. Registration requires providing accurate and
          complete information, including contact details and payment
          information.
        </Text>

        <Text style={styles.sectionTitle}>3. Payments</Text>
        <Text style={styles.sectionText}>
          Payments for laundry services are processed through the Circuit
          Laundry mobile application. Users are responsible for ensuring that
          payment information provided is accurate and up-to-date.
        </Text>

        <Text style={styles.sectionTitle}>4. Security</Text>
        <Text style={styles.sectionText}>
          Users are responsible for maintaining the confidentiality of their
          account credentials. Users must notify Infinity Laundry immediately of
          any unauthorized use of their account or any other security breach.
        </Text>

        <Text style={styles.sectionTitle}>5. Maintenance</Text>
        <Text style={styles.sectionText}>
          Infinity Laundry strives to maintain its machines and services in good
          working condition. Users must report any issues with machines or
          services promptly to Infinity Laundry customer support.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
        <Text style={styles.sectionText}>
          Infinity Laundry reserves the right to modify these terms and
          conditions at any time without prior notice. Users are responsible for
          regularly reviewing these terms for updates.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  wrapper: {
    padding: 20,
    maxWidth: 400,
    width: '100%'
  },
  titleText: {
    color: '#3930d8',
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center'
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 20
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22
  }
});

export default TermsAndConditions;
