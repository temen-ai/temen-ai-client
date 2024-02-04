import React from 'react';
import { View, StyleSheet } from 'react-native';

const StyleWrapper = ({ children }) => {
  return (
    <View style={styles.maxWidthContainer}>
      <View style={styles.mobileContainer}>
      {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maxWidthContainer: {
    backgroundColor: '#191919',
    width: '100%', // Take up 100% of the parent container width
    height: '100%',
  },
  mobileContainer: {
    width: '100%', // Take up 100% of the parent container width
    height: '100%',
    maxWidth: 500, // Typical mobile device width
    alignSelf: 'center', // Center the container
  }
});

export default StyleWrapper;
