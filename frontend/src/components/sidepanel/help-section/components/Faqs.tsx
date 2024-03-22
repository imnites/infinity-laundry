import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const FAQs: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Frequently Asked Questions</Text>

        <View>
          <Text style={styles.question}>
            Q: How do I register for Infinity Laundry?
          </Text>
          <Text style={styles.answer}>
            A: To register for Infinity Laundry, download our mobile app from
            the App Store or Google Play Store and follow the on-screen
            instructions to create an account.
          </Text>
        </View>
        <View>
          <Text style={styles.question}>
            Q: How can I add funds to my Infinity Laundry account?
          </Text>
          <Text style={styles.answer}>
            A: You can add funds to your Infinity Laundry account through the
            mobile app using a credit or debit card.
          </Text>
        </View>
        <View>
          <Text style={styles.question}>
            Q: How do I report a problem with a laundry machine?
          </Text>
          <Text style={styles.answer}>
            A: If you encounter any issues with a laundry machine, please
            contact our customer support team through the mobile app or website,
            and we will assist you promptly.
          </Text>
        </View>

        <View>
          <Text style={styles.question}>
            Q: Can I view the availability of laundry machines in my building?
          </Text>
          <Text style={styles.answer}>
            A: Yes, you can check the availability of laundry machines in your
            building through the Infinity Laundry mobile app. Simply log in to
            your account and navigate to the 'Machine Availability' section.
          </Text>
        </View>
        <View>
          <Text style={styles.question}>
            Q: How do I schedule a laundry cycle?
          </Text>
          <Text style={styles.answer}>
            A: You can schedule a laundry cycle using the Infinity Laundry
            mobile app. Select the desired washing machine, choose your
            preferred time slot, and confirm your booking.
          </Text>
        </View>
        <View>
          <Text style={styles.question}>
            Q: What payment methods are accepted?
          </Text>
          <Text style={styles.answer}>
            A: We accept payments via credit or debit card through the Circuit
            Laundry mobile app. You can securely add and manage your payment
            methods in your account settings.
          </Text>
        </View>
        <View>
          <Text style={styles.question}>
            Q: Is there a minimum amount for adding funds to my account?
          </Text>
          <Text style={styles.answer}>
            A: Yes, the minimum amount for adding funds to your Infinity Laundry
            account is $10.
          </Text>
        </View>
        <View>
          <Text style={styles.question}>
            Q: How can I contact customer support?
          </Text>
          <Text style={styles.answer}>
            A: You can reach our customer support team via email at
            support@circuitlaundry.com or by phone at +1 (800) 123-4567.
          </Text>
        </View>
        <View>
          <Text style={styles.question}>
            Q: Can I use Infinity Laundry services in multiple locations?
          </Text>
          <Text style={styles.answer}>
            A: Yes, you can use Infinity Laundry services in any participating
            property where our laundry machines are installed. Simply log in to
            your account using the mobile app, and you can access our services
            wherever you go.
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
    color: '#3930d8',
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center'
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 20
  },
  answer: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10
  }
});

export default FAQs;
