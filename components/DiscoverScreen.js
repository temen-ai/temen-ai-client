import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'; // Import Swiper
import CharacterPreviewBar from './CharacterPreviewBar'; // Import the new component
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import React, { useState, useEffect } from 'react';
import TabBar from './TabBar';
import axios from 'axios';
import { useUser } from './UserContext';

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [characterData, setCharacterData] = useState([]); // State to hold character data

  const { user } = useUser(); 

  //if user is not logged in, redirect to login screen
  if (!user) {
    navigation.replace('Login');
  }


  // Function to fetch character data from backend
  const fetchCharacterData = async () => {
    console.log(user.token)
    try {
      const response = await axios.get('https://teman-ai-server-930de02b860a.herokuapp.com/characters/', {
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



  const filteredCharacters = characterData.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholderTextColor="#757575" 
        placeholder="🔍Search Characters..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredCharacters}
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
      <TabBar isActive={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchBar: {
    backgroundColor: '#3b3b3b',
    padding: 10,
    borderRadius: 20,
    margin: 10,
    fontSize: 18,
    color: '#636363',
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



export default DiscoverScreen;
