import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const PackageScreen = () => {
  const packages = [
    { id: 1, name: 'PRO 1 Month', price: '49.000', description: 'Short description', promotion: '59.000' },
    // ... Add more packages as needed
  ];

  const handlePress = (id) => {
    console.log("Package ID:", id);
    // Add functionality for handling press here
  };

  return (
    <ScrollView style={styles.container}>
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} data={pkg} onPress={() => handlePress(pkg.id)} />
      ))}
    </ScrollView>
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
  // Add more styles as needed
});

export default PackageScreen;
