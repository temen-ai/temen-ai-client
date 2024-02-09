import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Swiper from 'react-native-swiper'; // Import Swiper
import CharacterPreviewBar from './CharacterPreviewBar'; // Import the new component
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import StyleWrapper from './StyleWrapper';
import { useUser } from './UserContext';
import { fetchActiveCharacters } from '../helpers/characters.js';
import LoadingPlaceholder from './LoadingPlaceholder';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [characterData, setCharacterData] = useState([]); // State to hold character data
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const { user } = useUser(); 
  //if user is not logged in, redirect to login screen
  if (!user) {
      navigation.replace('Login');
  }
  // Sample data for the swiper and character list
  const swiperImages = [
    'https://www.temen.ai/wp-content/uploads/2024/01/temenbanner-scaled.jpg',
    'https://www.temen.ai/wp-content/uploads/2024/01/temenbanner-scaled.jpg'
    // ... add more images
  ];

  // Use useEffect to fetch character data when component mounts
  useFocusEffect( // Use useFocusEffect to fetch character data when the screen is focused

    React.useCallback(() => {
      try {
        setIsLoading(true); // Start loading
        fetchActiveCharacters(user.token).then((data) => {
          setCharacterData(data); // Update the state with the fetched data
          setIsLoading(false); // Stop loading after data is fetched
        })

      } catch (error) {
          console.error('Error while fetching data:', error);
          setIsLoading(false);
          // Handle the error appropriately (e.g., show a notification to the user)
      }
    }
  , [])
  );


  return (
    <StyleWrapper>
    <View style={styles.container}>
      <View
        style={styles.wrapper} 
        >
        <Swiper 
          // Ensure the wrapper style is applied
        >
          {swiperImages.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image 
                source={{ uri: image }} 
                style={styles.image} 
                resizeMode='cover' 
              />
            </View>
          ))}
        </Swiper>
      </View>
      {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <FlatList
            data={characterData}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Chat', { character: item })}>
                <CharacterPreviewBar
                  name={item.name}
                  description={item.description}
                  profilePic={item.pfp}
                  id={item.id}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        )}

    </View>
    </StyleWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  wrapper: {
    height: 200, // Adjust this to fit your desired swiper height
    backgroundColor: '#121212', // Set the background color of the swiper
    paddingTop: 10, // Add some padding to the top of the swiper
  },
  slide: {
    borderRadius: 20,
    borderColor: '#121212', // Set the border color
    borderWidth: 2, // Set the border width
    overflow: 'hidden',
    height: "100%", // Ensure each slide is the same height as the swiper
    width: '100%', // Match the width with the swiper
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#FF0000', //red
    resizeMode: 'cover',
    width: '100%',
    height: '100%', // Make image take full height of the slide
  },
  characterPreviewBar: {
    backgroundColor: '#1F1F1F',
    padding: 20,
    margin: 10,
    borderRadius: 10, // Rounded edges for character bars
  },
  characterText: {
    color: '#fff',
    fontSize: 16,
  },
});



export default HomeScreen;
