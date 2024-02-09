import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView,Platform, FlatList,TextInput, ScrollView } from 'react-native';
import { Share } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateCharacter } from '../helpers/characters';
import StyleWrapper from './StyleWrapper';

import { useUser } from './UserContext';

const CharacterProfileScreen = ({ route, navigation }) => {
  const { character } = route.params; //data from previous data
  const default_pfp = require("../assets/placeholderpfp.jpg")
  const {user} = useUser();

  const handleEditPress = () => {
    navigation.navigate('EditCharacter', { character });
  };

  const handleCreatorPress = () => {
    // Assuming 'character.created_by' is the user_id you want to pass
    navigation.navigate('UserProfileScreen', { user_id: character.created_by });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, character]);

  const handleBackPress = () => {
    // Navigate back and pass the character data
    navigation.navigate('Chat', { character: character });
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
    <StyleWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={character.pfp  ? { uri: character.pfp  } : default_pfp} style={styles.profileImage} />
        <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{character.name}</Text>
        <Text style={styles.description} numberOfLines={4} ellipsizeMode='tail'>{character.description}</Text>

        {/* Creator Information */}
        {character.created_by && character.creator_username && (
        <TouchableOpacity onPress={handleCreatorPress}>
          <Text style={styles.creatorInfo}>
            Temen-nya: @{character.creator_username || 'Unknown'}
          </Text>
        </TouchableOpacity>)}
        
        {/* Buttons */}
        {/* Edit button is only shown if the user is the creator of the character */}
        {user.id === character.created_by && (<>
        <TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Edit Character</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSharePress}>
          <Text style={styles.buttonText}>Share Character</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNewChatPress}>
          <Text style={styles.buttonText}>Start New Chat</Text>
        </TouchableOpacity></>)}
      </ScrollView>
    </StyleWrapper>
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
  creatorInfo: {
    fontSize: 14, // Smaller font size for creator info
    color: '#0096FF', // Blue color for the text
    fontStyle: 'italic', // Italicize the text
    marginBottom: 20, // Margin bottom for spacing
  },
  // Additional styles for character details
});

export default CharacterProfileScreen;
