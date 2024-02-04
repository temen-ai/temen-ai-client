import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView,Platform, FlatList,TextInput, ScrollView } from 'react-native';
import { Share } from 'react-native';

import { useUser } from './UserContext';
import axios from 'axios';
import StyleWrapper from './StyleWrapper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CharacterProfileScreen = ({ route, navigation }) => {
  const { character } = route.params; //data from previous data

  const handleEditPress = () => {
    navigation.navigate('EditCharacter', { character });
  };

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: `Check out this character: ${character.name}\n${character.description}`,
        // can also add a URL to the character profile if there is one
        // url: 'https://link-to-character-profile.com',
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType 
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
    
  const handleNewChatPress = () => {
    navigation.navigate('Chat', { character });
    // clear chat from backend
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.pfp }} style={styles.profileImage} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.description}>{character.description}</Text>
      
      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Edit Character</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSharePress}>
        <Text style={styles.buttonText}>Share Character</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNewChatPress}>
        <Text style={styles.buttonText}>Start New Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color for the screen
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 10, // Circular image
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text for name
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#aaa', // Light grey text for description
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0096FF', // Gold color for buttons to pop out
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10, // More rounded corners
    marginVertical: 10,
    alignSelf: 'stretch', // Stretch button to full width of container
    alignItems: 'center', // Center text in button
  },
  buttonText: {
    color: '#fff', // Dark text on buttons for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Additional styles for character details
});

export default CharacterProfileScreen;
