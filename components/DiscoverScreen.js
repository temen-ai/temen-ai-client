import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'; // Import Swiper
import CharacterPreviewBar from './CharacterPreviewBar'; // Import the new component
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import StyleWrapper from './StyleWrapper.js';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native'; 
import LoadingPlaceholder from './LoadingPlaceholder';
import {fetchAllCharacters} from '../helpers/characters.js';

import axios from 'axios';
import { useUser } from './UserContext';
import LoadingPlaceholderItem from './LoadingPlaceholderItem';
import { MaterialIcons } from '@expo/vector-icons';

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [characterData, setCharacterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useUser();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    }
  }, [user, navigation]);

  const fetchPageData = (page) => {
    setIsLoading(true);
    const offset = (page - 1) * itemsPerPage;

    fetchAllCharacters(user.token, searchTerm, itemsPerPage, offset)
      .then((newData) => {
        setHasMore(newData.length === itemsPerPage);
        setCharacterData(newData);
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error('Error while fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    fetchPageData(newPage);
  };

  const handleNextPage = () => {
    if (hasMore) {
      fetchPageData(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchPageData(1); // Fetch first page initially
  }, [searchTerm]);

  // onChangeText handler for the search input
  const handleSearchChange = (text) => {
    setSearchTerm(text);
    setCharacterData([]); // Reset character data
    setHasMore(true); // Reset hasMore
    setCurrentPage(1); // Reset currentPage to start from the beginning
  
    // Fetch first page data. This will be search data if text is not empty,
    // or default data if search bar is cleared (text is empty).
    fetchMoreData(1);
  };
  

  return (
    <StyleWrapper>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholderTextColor="#757575"
          placeholder="🔍Search Characters..."
          value={searchTerm}
          onChangeText={handleSearchChange}          
        />

        {/* Pagination buttons using MaterialIcons */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 1}>
            <MaterialIcons name="navigate-before" size={30} color={currentPage === 1 ? 'grey' : 'white'} />
          </TouchableOpacity>
          <Text style={styles.pageNumber}>Page {currentPage}</Text>
          <TouchableOpacity onPress={handleNextPage} disabled={!hasMore}>
            <MaterialIcons name="navigate-next" size={30} color={!hasMore ? 'grey' : 'white'} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={characterData}
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
          keyExtractor={item => item.id.toString()}
          
        />
      </View>
    </StyleWrapper>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  pageNumber: {
    color: 'white',
    fontSize: 16,
  },
  paginationButton: {
    color: 'white',
    fontSize: 16,
  },

});



export default DiscoverScreen;