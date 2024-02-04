// LoadingPlaceholder.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import LoadingPlaceholderItem from './LoadingPlaceholderItem';

const LoadingPlaceholder = () => {
  const placeholderData = Array.from({ length: 10 }, (_, index) => index);

  return (
    <FlatList
      data={placeholderData}
      renderItem={() => <LoadingPlaceholderItem />}
      keyExtractor={(item) => item.toString()}
    />
  );
};

export default LoadingPlaceholder;
