// LoadingPlaceholder.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

const LoadingPlaceholderItem = () => (
  <View style={styles.placeholderBox}>
    <View style={styles.placeholderImage} />
    <View style={styles.placeholderText} />
    <View style={styles.placeholderTextSmall} />
  </View>
);

const styles = StyleSheet.create({

    placeholderBox: {
    backgroundColor: '#3b3b3b', // Color similar to your character box
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    },
    placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2a2a2a', // Darker shade for the image placeholder
    marginRight: 10,
    },
    placeholderText: {
    height: 20,
    width: 120,
    backgroundColor: '#2a2a2a', // Darker shade for the text placeholder
    marginBottom: 5,
    borderRadius: 5,
    },
    placeholderTextSmall: {
    height: 15,
    width: 80,
    backgroundColor: '#2a2a2a', // Darker shade for the smaller text placeholder
    borderRadius: 5,
    },
});

export default LoadingPlaceholderItem;
