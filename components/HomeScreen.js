import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Swiper from 'react-native-swiper'; // Import Swiper
import CharacterPreviewBar from './CharacterPreviewBar'; // Import the new component
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import TabBar from './TabBar';
import { useUser } from './UserContext';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [characterData, setCharacterData] = useState([]); // State to hold character data

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

  // Function to fetch character data from backend
  const fetchCharacterData = async () => {
    console.log(user.token)
    try {
      const response = await axios.get('https://teman-ai-server-930de02b860a.herokuapp.com/characters/active/', {
        headers: {
          Authorization: `Bearer ${user.token}`, // Use the access token from the user object
        },
      });

      setCharacterData(response.data.data); // Set character data from backend response
    } catch (error) {
      console.error('Error fetching character data:', error);
      // Handle error appropriately
    }
  };

  // Use useEffect to fetch character data when component mounts
  useEffect(() => {
    fetchCharacterData();
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <View style={styles.container}>
      <Swiper 
        style={styles.wrapper} // Ensure the wrapper style is applied
      >
        {swiperImages.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image 
              source={{ uri: image }} 
              style={styles.image} 
              resizeMode='contain' 
            />
          </View>
        ))}
      </Swiper>
      <FlatList
        data={characterData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { character: item })}>
            <CharacterPreviewBar
              name={item.name}
              description={item.description}
              profilePic={item.profilePic}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <TabBar isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  wrapper: {
    height: 100, // Adjust this to fit your desired swiper height
  },
  slide: {
    flex: 1, // Ensure slide takes full height of its parent
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    height: 100, // Ensure each slide is the same height as the swiper
  },
  image: {
    width: '100%',
    height: '100%', // Make image take full height of the slide
    resizeMode: 'contain', // Change this to 'contain' to fit the whole image in the slide
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
