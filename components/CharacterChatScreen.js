import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useUser } from './UserContext';
import axios from 'axios';

const CharacterChatScreen = ({ route, navigation }) => {
  const { character } = route.params;
  const [messages, setMessages] = useState([]);

    const { user } = useUser(); 
    //if user is not logged in, redirect to login screen
    if (!user) {
        navigation.replace('Login');
    }
    const flatListRef = useRef(null);
    const fetchMessagesData = async () => {
        console.log(user,"woiuser")
        try {
          const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/messages/${character.id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`, // Use the access token from the user object
            },
          });
          console.log(response.data,"yeyyy")
          setMessages(response.data.data); // Set character data from backend response
        } catch (error) {
          console.error('Error fetching character data:', error);
          // Handle error appropriately
        }
      };

    useEffect(() => {
    fetchMessagesData();
    }, []); // Empty dependency array means this effect runs once on mount

    const [inputText, setInputText] = useState('');

    const sendMessage = async () => {
        if (!inputText.trim()) return; // Avoid sending empty messages
      
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
          const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/openai/?character_id=${characterId}&prompt=${encodeURIComponent(userPrompt)}`, {
            headers: {
              Authorization: `Bearer ${user.token}`, // Use the access token from the user object
            },
          });
          console.log(response.data.data.data, "yeyyy");
      
          // Update messages with the character's response
          setMessages(prevMessages => [
            ...prevMessages,
            ...response.data.data.data.map(item => ({
              ...item,
              id: Date.now().toString(), // Ensure a unique ID
            })),
          ]);
        } catch (error) {
          console.error('Error fetching character data:', error);
          // Handle error appropriately
        }
      };
      
      
    
  const sendArrowSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
`;

  const renderMessageItem = ({ item }) => {
    let messageStyle = item.sent_by !== item.character_id ? styles.userMessage : styles.characterMessage;
    return (
      <View style={messageStyle}>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };
  
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust the value as needed for your layout
        >
      <View style={styles.header}>
        <Image source={{ uri: character.profilePic }} style={styles.profilePic} />
        <Text style={styles.characterName}>{character.name}</Text>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity> */}
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        style={styles.chatContainer}
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
            <SvgXml xml={sendArrowSvg} width={24} height={24} fill="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  characterName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  chatContainer: {
    flex: 1,
  },
  userMessage: {
    margin: 10,
    padding: 10,
    backgroundColor: '#d1edf2',
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  characterMessage: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fde4cf',
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
  backButton: {
    marginLeft: 'auto',
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFF', // White arrow color for better contrast
    fontSize: 20, // Adjust size to fit your design
  },
});

export default CharacterChatScreen;
