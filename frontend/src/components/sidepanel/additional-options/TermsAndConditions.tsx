import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const TermsAndConditions = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Terms and Conditions</Text>

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Services</Text>
          <Text style={styles.sectionText}>
            Infinity Laundry provides laundry services for residents of
            participating properties. Users can access our services through our
            mobile application or laundry machines equipped with Infinity
            Laundry technology.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Registration</Text>
          <Text style={styles.sectionText}>
            Users must register an account through our mobile application to
            access our services. Registration requires providing accurate and
            complete information, including contact details and payment
            information.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Payments</Text>
          <Text style={styles.sectionText}>
            Payments for laundry services are processed through the Circuit
            Laundry mobile application. Users are responsible for ensuring that
            payment information provided is accurate and up-to-date.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Security</Text>
          <Text style={styles.sectionText}>
            Users are responsible for maintaining the confidentiality of their
            account credentials. Users must notify Infinity Laundry immediately
            of any unauthorized use of their account or any other security
            breach.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Maintenance</Text>
          <Text style={styles.sectionText}>
            Infinity Laundry strives to maintain its machines and services in
            good working condition. Users must report any issues with machines
            or services promptly to Infinity Laundry customer support.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
          <Text style={styles.sectionText}>
            Infinity Laundry reserves the right to modify these terms and
            conditions at any time without prior notice. Users are responsible
            for regularly reviewing these terms for updates.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8'
  },
  wrapper: {
    flex: 1,
    padding: 20,
    paddingTop: 40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
    color: '#555'
  },
  section: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
    color: 'black'
  }
});

export default TermsAndConditions;
