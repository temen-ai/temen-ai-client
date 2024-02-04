import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Text, View, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView,Platform, FlatList,TextInput, Keyboard } from 'react-native';
import { useUser } from './UserContext';
import axios from 'axios';
import StyleWrapper from './StyleWrapper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {sendMessageToAI, fetchMessagesData} from '../helpers/messages.js';

const CharacterChatScreen = ({ route, navigation }) => {
  const { character } = route.params;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser(); 
  //if user is not logged in, redirect to login screen
  if (!user) {
      navigation.replace('Login');
  }
  const flatListRef = useRef(null);


  const [inputText, setInputText] = useState('');


  useEffect(() => {
    fetchMessagesData(user.token,character.id).then((data) => {
      setMessages(data);
    })
      
  }, []); // Empty dependency array means this effect runs once on mount



  const sendMessage = async () => {
      if (!inputText.trim()) return; // Avoid sending empty messages
      setIsLoading(true);
      const characterId = character.id;
      const userPrompt = inputText;
      const userMessage = {
        id: Date.now().toString(),
        message: userPrompt,
        sent_by: "user", // Assuming 'user' is the identifier for messages sent by the user
      };
    
      // Optimistically update UI with the user's message
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputText(''); // Clear input field after adding message
    
      try {
        sendMessageToAI(user.token,characterId,userPrompt).then((data) => {
          setMessages(prevMessages => [
            ...prevMessages,
            ...data.data.map(item => ({
              ...item,
              id: Date.now().toString(), // Ensure a unique ID
            })),
          ]);
          setIsLoading(false)
        })
      } catch (error) {
        console.error('Error fetching character data:', error);
        setIsLoading(false)
        // Handle error appropriately
      }
    };

  const renderMessageItem = ({ item }) => {
    let isCharacterMessage = item.sent_by === character.id;
    let messageContainerStyle = isCharacterMessage ? styles.characterMessageContainer : styles.userMessageContainer;
  
    return (
      <View style={messageContainerStyle}>
        {isCharacterMessage && (
          <Image source={{ uri: character.pfp }} style={styles.smallProfilePic} />
        )}
        <View style={[styles.chatBubble, isCharacterMessage ? styles.characterMessage : styles.userMessage]}>
          <Text style={styles.messageText}>{formatText(item.message)}</Text>
        </View>
      </View>
    );
  };
  
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  

  useEffect(() => {
    const isDesktop = Dimensions.get('window').width >= 1024; // Example breakpoint for desktop

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        //character variable holds the character data to pass on to next component
        <TouchableOpacity onPress={() => navigation.navigate('CharacterProfile', {character})} style={isDesktop ? styles.headerTitleDesktop : styles.headerTitle}>
          <Image
            source={{ uri: character.pfp }}
            style={styles.profilePic}
          />
          <Text style={styles.headerText}>{character.name}</Text>
        </TouchableOpacity>
      ),
      // Optionally, set other options as needed
    });
  }, [navigation, character]);

  const formatText = (text) => {
    const formattedText = text.split(/(\*.*?\*|_.*?_)/).map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <Text key={index} style={{ fontWeight: 'bold' }}>{part.slice(1, -1)}</Text>;
      } else if (part.startsWith('_') && part.endsWith('_')) {
        return <Text key={index} style={{ fontStyle: 'italic' }}>{part.slice(1, -1)}</Text>;
      } else {
        return part;
      }
    });
  
    return formattedText;
  };

  const LoadingBubble = () => {
    const [dots, setDots] = useState('.');
    
    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 5 ? prevDots + '.' : '.'));
      }, 500);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
          <View style={styles.characterMessageContainer}>

            <Image source={{ uri: character.pfp }} style={styles.smallProfilePic} />

            <View style={[styles.chatBubble, styles.characterMessage]}>
              <Text style={styles.loadingText}>{dots}</Text>
            </View>
          </View>
    );
  };

  return (
    <StyleWrapper>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        style={styles.chatContainer}
        ListFooterComponent={isLoading ? <LoadingBubble /> : null}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      {/* Chat input field */}
      <View style={styles.inputContainer}>
        <TextInput
            style={styles.inputField}
            placeholder='Type your message here...'
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText} // Update state on text change
        />

        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </StyleWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1A1A1A', // Slightly lighter shade for the header
  },
  backButton: {
    marginLeft: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Set text color to white
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center title for desktop screens
    flex: 1, // Take up full available space
  },
  characterName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  userMessage: {
    margin: 10,
    padding: 10,
    backgroundColor: '#d1edf2',
    alignSelf: 'flex-end',
    borderRadius: 10,
  },

  messageText: {
    fontSize: 16,
  },

  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  chatContainer: {
    flex: 1,
    paddingBottom: 10, // Add padding to ensure content is visible above input
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1A1A1A', // Dark background for input container
    alignItems: 'center', // Align items vertically in the center
    paddingBottom: 50, // Add some padding at the bottom to avoid input being hidden
  },
  inputField: {
    paddingVertical: 15, // Slightly increased vertical padding for more space
    paddingHorizontal: 15, // Define horizontal padding
    backgroundColor: '#252525', // Dark grey/blue shade
    color: '#FFF', // White text color for better contrast
    borderRadius: 20, // Rounded corners
    marginRight: 10, // Space before send button
    flex: 1, // Allow it to fill space but respect height of container
    // Removed the fixed height, so it can expand based on content
    // height: '100%', (removed)
  },
  sendButton: {
    backgroundColor: '#0096FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFF', // White arrow color for better contrast
    fontSize: 20, // Adjust size to fit your design
  },
  loadingBubble: {
    padding: 10,
    backgroundColor: '#fde4cf',
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginLeft: 25, // Adjust as needed
  },
  loadingText: {
    color: '#000',
    fontSize: 16,
  },
  characterMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 10,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  smallProfilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  chatBubble: {
    maxWidth: '80%', // Adjust as needed
    padding: 10,
    borderRadius: 10,
  },
  characterMessage: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fde4cf',
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#d1edf2',
    alignSelf: 'flex-end',
  },
});

export default CharacterChatScreen;
