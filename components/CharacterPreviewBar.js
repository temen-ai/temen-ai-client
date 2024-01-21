// CharacterPreviewBar.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CharacterPreviewBar = ({ name, description, profilePic }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: profilePic }} style={styles.profilePic} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center', // Align items in the center vertically
  },
  profilePic: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
    borderRadius: 10, // Make it round
    marginRight: 10, // Add some margin between the image and the text
  },
  textContainer: {
    flex: 1, // Take up the remaining space
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CharacterPreviewBar;
