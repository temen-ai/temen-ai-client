import React, { useState, useEffect } from 'react';

import { getPackages, getPurchaseLink } from '../helpers/packages';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';

import StyleWrapper from './StyleWrapper';
import { useUser } from './UserContext';


const PackageScreen = () => {

  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();
  
  useEffect(() => {
    setIsLoading(true);
    getPackages(user.token)
      .then((data) => {
        setPackages(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error while fetching packages:', error);
        setIsLoading(false);
      });
  }, []);


  const redirectToPurchase = (id) => {
    setIsLoading(true);
    getPurchaseLink(user.token ,id)
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        if (data && data.redirectUrl) {
          Linking.openURL(data.redirectUrl)
            .catch(err => {
              console.error('An error occurred', err);
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error while fetching purchase link:', error);
      });
  };

  return (
    <StyleWrapper>
      
      {isLoading ?        
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
        :
        <ScrollView style={styles.container}>
          <ProPlanBenefits />
          {packages?.map((pkg) => (
            <PackageCard key={pkg.id} data={pkg} onPress={() => redirectToPurchase(pkg.id)} />
          ))}
        </ScrollView>
      }
    </StyleWrapper>
  );
};

const PackageCard = ({ data, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Text style={styles.title}>{data.name}</Text>
    <View style={styles.priceSection}>
      <Text style={styles.promotion}>{data.promotion}</Text>
      <Text style={styles.price}>{data.price}</Text>
    </View>
    <Text style={styles.description}>{data.description}</Text>
  </TouchableOpacity>
);

const ProPlanBenefits = () => (
  <View style={styles.proPlanContainer}>
    <Text style={styles.proPlanTitle}>Dapatkan fitur lengkap dengan Temen.AI PRO!</Text>
    <Text style={styles.proPlanDescription}>
      Upgrade ke Pro untuk mendapatkan:
    </Text>
    <Text style={styles.proPlanBenefit}>- Chatting sepuasnya dengan respon lebih cepat!</Text>
    <Text style={styles.proPlanBenefit}>- Buatlah gambar dengan AI</Text>
    <Text style={styles.proPlanBenefit}>- Update dan Fitur Baru</Text>
    <Text style={styles.proPlanBenefit}>- </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    padding: 20,
  },
  card: {
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  promotion: {
    fontSize: 16,
    color: '#aaa',
    textDecorationLine: 'line-through', // Crossed out style
    marginRight: 10,
  },
  price: {
    fontSize: 18,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#aaa',
  },

  proPlanContainer: {
    backgroundColor: '#2a2a2a', // Adjust the color as needed
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  proPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  proPlanDescription: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 10,
  },
  proPlanBenefit: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 5,
  },
  // Add more styles as needed
});

export default PackageScreen;
