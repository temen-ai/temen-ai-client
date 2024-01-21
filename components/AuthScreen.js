import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../config/supabaseConfig.js'; // Import your Supabase config
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('https://www.temen.ai/wp-content/uploads/2024/01/Untitled-design-2.jpg');
  const [message, setMessage] = useState('');
  const { setUser } = useUser();

  const navigation = useNavigation();
  // Handle login with Supabase
  const handleLogin = async () => {
    try {
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;  // If there's an error, throw it to be caught by the catch block
      
      console.log('Logged in:', user, session);
      setUser({
        ...user, // Spread user data
        token: session.access_token, // Save the access token
      });
      console.log(session)
      // setUser(user); // Uncomment if you have setUser function available to manage global user state
      navigation.replace('Your Chats'); // Navigate to 'YourChats' screen. Make sure navigation prop is passed to this component
      setMessage('Logged in successfully!'); // You can set a success message
    } catch (error) {
      console.error('Error logging in:', error.message);
      setMessage(error.message); // Display error message
    }
  };
  

  // Handle registration with Supabase
  const handleRegister = async () => {
    try {
      const { user, session, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error; // If there's an error, throw it to be caught by the catch block
  
      console.log('Signed up:', user, session);
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
      setMessage('Congrats! Check your email for registration confirmation.'); // Set success message
      // Optionally, you can navigate to another screen or perform other actions
    } catch (error) {
      console.error('Error signing up:', error.message);
      setMessage(error.message); // Display error message
    }
  };
  

  return (
<   View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#1e90ff' }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock', color: '#1e90ff' }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      {/* Display message */}
      {!!message && <Text style={styles.messageText}>{message}</Text>}
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919', // Dark background
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      inputContainer: {
        borderBottomWidth: 0, // Remove underline
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent white background
        borderRadius: 5, // Rounded corners
        paddingHorizontal: 15,
        marginBottom: 15,
      },
      input: {
        color: '#fff',
      },
      image: {
        width: 150,
        height: 150,
        marginBottom: 20,
      },
      button: {
        width: '95%',
        padding: 15,
        backgroundColor: '#1e90ff', // Button color
        borderRadius: 20, // Rounded corners
        alignItems: 'center',
        marginBottom: 20,
      },
      buttonText: {
        color: '#fff', // White text color
        fontSize: 16,
      },
      messageText: {
        color: 'green', // Green text for success message
        marginTop: 20,
        textAlign: 'center',
      },
});

export default AuthScreen;


