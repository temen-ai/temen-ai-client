import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity,Platform ,Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // If using Expo or use another image picker library if not
import StyleWrapper from './StyleWrapper'; // Import the StyleWrapper component
import {updateCharacter} from '../helpers/characters.js';
import { supabase } from '../config/supabaseConfig.js';
import { useUser } from './UserContext';
import { uploadImage } from '../helpers/files.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';




const EditCharacterScreen = ({ route, navigation }) => {
  const { character } = route.params;
  const { user } = useUser(); 
  const default_pfp = require("../assets/placeholderpfp.jpg")

  const [formData, setFormData] = useState({
    prompt: character.prompt,
    description: character.description,
    welcomeMessage: character.welcome_message,
    name: character.name,
    profilePicture: character.pfp,
    isPublic: character.is_public,
    tempProfilePicture: null, // Temporary storage for picked image URI
  });

  const [promptCharacterCount, setPromptCharacterCount] = useState(formData.prompt.length);
  const [welcomeMessageCharacterCount, setWelcomeMessageCharacterCount] = useState(formData.welcomeMessage.length);

  
  const toggleIsPublic = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      isPublic: !prevFormData.isPublic,
    }));
  };

  const handleInputChange = (inputName, inputValue) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [inputName]: inputValue,
    }));
  };

  const [isUpdating, setIsUpdating] = useState(false); 

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    console.log(result);
    console.log(result.assets[0].uri);
    
  
    if (!result.cancelled) {
      // Resize the image using ImageManipulator
      
      setFormData(prevFormData => ({
        ...prevFormData,
        tempProfilePicture: result.assets[0].uri,
      }));
    }
  };
  
  const updateCharacterDetails = async () => {
    setIsUpdating(true);
    try {
      let newProfilePicture = formData.profilePicture;
  
      if (formData.tempProfilePicture) {
        const uploadedImagePath = await uploadImage(formData.tempProfilePicture);
        newProfilePicture = supabase.storage.from('pfp').getPublicUrl(uploadedImagePath).data.publicUrl;
      }
  
      await updateCharacter(user.token, character.id, formData.name, formData.description, formData.prompt, newProfilePicture, formData.welcomeMessage, formData.isPublic);
  
      // Update the character object with new values
      const updatedCharacter = {
        ...character,
        name: formData.name,
        description: formData.description,
        prompt: formData.prompt,
        welcome_message: formData.welcomeMessage,
        pfp: newProfilePicture,
      };
  
      Alert.alert("Berhasil", `Karakter ${updatedCharacter.name} telah di-update!`);
  
      // Navigate back and pass the updated character data
      navigation.navigate('CharacterProfile', { character: updatedCharacter });
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating character:', error);
      setIsUpdating(false);
      throw error;
    }
  };




  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyleWrapper>
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Profile Picture</Text>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image 
              source={formData.tempProfilePicture || formData.profilePicture ? { uri: formData.tempProfilePicture || formData.profilePicture } : default_pfp}
              style={styles.profileImage} 
            />
          </TouchableOpacity>


          <Text style={styles.label}>Nama</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Enter name"
            maxLength={50} 
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.input}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Enter description"
            maxLength={150} 
          />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Deskripsi Temen-mu</Text>
            <Text style={styles.characterCounter}>{promptCharacterCount}/5000</Text>
          </View>
          <TextInput
            style={styles.input}
            value={formData.prompt}
            onChangeText={(text) => {
              handleInputChange('prompt', text);
              setPromptCharacterCount(text.length);
            }}
            placeholder="Enter prompt"
            multiline
            numberOfLines={4}
            maxLength={5000} 
          />
          

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Welcome Message</Text>
            <Text style={styles.characterCounter}>{welcomeMessageCharacterCount}/2000</Text>
          </View>
          <TextInput
            style={styles.input}
            value={formData.welcomeMessage}
            onChangeText={(text) => {
              handleInputChange('welcomeMessage', text);
              setWelcomeMessageCharacterCount(text.length);
            }}
            placeholder="Enter welcome message"
            multiline
            numberOfLines={4}
            maxLength={2000} 
          />
          
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, formData.isPublic && styles.checkboxChecked]}
              onPress={toggleIsPublic}
            >
              {formData.isPublic && <FontAwesome name="check" size={18} color="#FFF" />}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Is Public</Text>
          </View>

      
          <TouchableOpacity style={styles.button} onPress={updateCharacterDetails} disabled={isUpdating}>
            <Text style={styles.buttonText}>{isUpdating ? "Menyimpan..." : "Simpan Temen-mu"}</Text>
          </TouchableOpacity>

        </ScrollView>
      </StyleWrapper>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  //pure white color
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#FFF'
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: '#FFF'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center', // Center the checkmark icon horizontally
    justifyContent: 'center', // Center the checkmark icon vertically
    backgroundColor: 'transparent', // Ensure the background is transparent
  },
  checkboxChecked: {
    backgroundColor: '#0096FF', // Color for the checkbox when checked
  },  
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#FFF', // Checkmark color
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#FFF',
  },
  characterCounter: {
    color: '#FFF',
    fontSize: 12,
    alignSelf: 'flex-end', // Align the text to the right
    marginBottom: 5, // Provide some space below the counter
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will push the label to the left and the counter to the right
    alignItems: 'center', // This will ensure they are aligned to their center
    marginBottom: 5, // Optional: adjust the space between this container and the TextInput
  }  
});

export default EditCharacterScreen;
