import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // If using Expo or use another image picker library if not
import StyleWrapper from './StyleWrapper.js'; // Import the StyleWrapper component
import { updateUser } from '../helpers/user.js';
import { supabase } from '../config/supabaseConfig.js';
import { useUser } from './UserContext.js';
import { uploadImage } from '../helpers/files.js';


const EditProfileScreen = ({ route, navigation }) => {
  const { user } = useUser(); 
  const default_pfp = require("../assets/placeholderpfp.jpg")

  const [formData, setFormData] = useState({
    username: user.username,
    description: user.description,
    pfp: user.pfp,
    social_link: user.social_link,
    promo_code: user.promo_code,
    tempProfilePicture: null, // Temporary storage for picked image URI
  });

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
  
  const updateUserDetails = async () => {
    setIsUpdating(true);
    try {
      let newProfilePicture = formData.profilePicture;
  
      if (formData.tempProfilePicture) {
        const uploadedImagePath = await uploadImage(formData.tempProfilePicture);
        newProfilePicture = supabase.storage.from('pfp').getPublicUrl(uploadedImagePath).data.publicUrl;
      }
  
      await updateUser(user.token, user.id, formData.name, formData.description, formData.prompt, newProfilePicture, formData.welcomeMessage, formData.isPublic);
  
      // Update the character object with new values
      const updatedUser = {
        ...user,
        name: formData.name,
        description: formData.description,
        pfp: newProfilePicture,
        social_link: formData.social_link,
        promo_code: formData.promo_code
      };
  
      Alert.alert("Berhasil", `Profil-mu telah di-update!`);
  
      // Navigate back and pass the updated character data
      navigation.navigate('Main');
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating character:', error);
      setIsUpdating(false);
      throw error;
    }
  };




  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <StyleWrapper>
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Profile Picture</Text>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image 
              source={formData.tempProfilePicture || formData.pfp ? { uri: formData.tempProfilePicture || formData.pfp } : default_pfp}
              style={styles.profileImage} 
            />
          </TouchableOpacity>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Name"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            placeholder="Description"
            multiline
          />
          
          <Text style={styles.label}>Social Link</Text>
          <TextInput
            style={styles.input}
            value={formData.welcomeMessage}
            onChangeText={(text) => handleInputChange('social_link', text)}
            placeholder="Social Link"
          />

          <Text style={styles.label}>Promo Code</Text>
          <TextInput
            style={styles.input}
            value={formData.welcomeMessage}
            onChangeText={(text) => handleInputChange('promo_code', text)}
            placeholder="Promo Code"
            multiline
          />

      
          <TouchableOpacity style={styles.button} onPress={updateUserDetails} disabled={isUpdating}>
            <Text style={styles.buttonText}>{isUpdating ? "Menyimpan..." : "Simpan Profil-mu"}</Text>
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
});

export default EditProfileScreen;
