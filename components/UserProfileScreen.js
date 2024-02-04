import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView,Platform, FlatList,TextInput, ScrollView } from 'react-native';
import { Share } from 'react-native';

import { useUser } from './UserContext';
import axios from 'axios';
import StyleWrapper from './StyleWrapper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CharacterPreviewBar from './CharacterPreviewBar'; // Import the new component
import LoadingPlaceholder from './LoadingPlaceholder';

import {fetchUserCharacters} from '../helpers/characters.js';

const default_pfp = "https://ayviizcviexxanfbiwek.supabase.co/storage/v1/object/public/pfp/%20.png"
const default_username = "Temen Ai"
const default_description = "set bio, link, dan nama anda di settings!"
const default_social_link = "www.instagram.com/temen.ai"
const default_messages_count = 0

const UserProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const { user:current_user } = useUser(); // Get the user from the context
  const isCurrentUser = current_user?.id === user?.id; // Check if the current user is the same as the user being viewed

  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [characterData, setCharacterData] = useState([]); // State to hold character data

  const handleEditPress = () => {
    navigation.navigate('EditProfile');
  }


  useEffect(() => { 
    fetchUserCharacters(user.token,user.id).then((data) => {
      setCharacterData(data); // Update the state with the fetched data
      setIsLoading(false); // Stop loading after data is fetched
    })
  } , []); // Empty dependency array means this effect runs once on mount

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.pfp ||default_pfp }} style={styles.profileImage} resizeMode='contain'/>
      <Text style={styles.name}>{user.username || default_username}</Text>

      {/* User description */}
      <Text style={styles.description}>{user.description || default_description }</Text>

      {/* User social link (if available) */}

      <Text style={styles.socialLink}>{user.social_link || default_social_link}</Text>


      {/* User messages count */}

       <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialIcons name="message" size={20} color="#aaa" />

      
        <Text style={styles.messageCount}> {user.messages_count || default_messages_count }</Text>
      </View>

      {/* Edit user button */}
      { isCurrentUser &&
        (<TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
        
      { isCurrentUser &&
        (<TouchableOpacity style={styles.logoutButton} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      )}

      {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <FlatList
            data={characterData}
            style={{width: '100%'}}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Chat', { character: item })}>
                <CharacterPreviewBar
                  name={item.name}
                  description={item.description}
                  profilePic={item.pfp}
                  messages_count={item.messages_count}
                  id={item.id}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        )}

    </View>
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
    width: 80,
    height:80,
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0096FF', // 
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10, // More rounded corners
    marginVertical: 10,
    alignSelf: 'stretch', // Stretch button to full width of container
    alignItems: 'center', // Center text in button
  },
  logoutButton: {
    backgroundColor: '#D70040', // 
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
  socialLink: {
    fontSize: 15,
    marginVertical: 5,
    color: '#007bff', // Example link color
  },
  messageCount: {
    fontSize: 15,
    marginVertical: 5,
    color: '#aaa', // Light grey text for description
  },
  // Additional styles for character details
});

export default UserProfileScreen;
