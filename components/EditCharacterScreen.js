import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // If using Expo or use another image picker library if not

const EditCharacterScreen = ({ route, navigation }) => {
  const { character } = route.params;

  const [formData, setFormData] = useState({
    prompt: character.prompt,
    welcomeMessage: character.welcome_message,
    name: character.name,
    profilePicture: character.pfp, // assuming character.pfp is the link to the profile picture
  });

  const handleInputChange = (inputName, inputValue) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [inputName]: inputValue,
    }));
  };

  const handleImagePicker = async () => {
    // Ensure that you have the appropriate permissions for image picking
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setFormData(prevFormData => ({
        ...prevFormData,
        profilePicture: result.uri,
      }));
    }
  };

  const saveCharacterDetails = () => {
    // Save logic here
    // ...

    // Example Alert to simulate save action
    Alert.alert("Save Successful", "Character details have been updated.");
    
    // After saving, navigate back to the profile screen:
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prompt</Text>
      <TextInput
        style={styles.input}
        value={formData.prompt}
        onChangeText={(text) => handleInputChange('prompt', text)}
        placeholder="Enter prompt"
      />
      
      <Text style={styles.label}>Welcome Message</Text>
      <TextInput
        style={styles.input}
        value={formData.welcomeMessage}
        onChangeText={(text) => handleInputChange('welcomeMessage', text)}
        placeholder="Enter welcome message"
        multiline
      />
      
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Profile Picture</Text>
      <TouchableOpacity onPress={handleImagePicker}>
        <Image source={{ uri: formData.profilePicture }} style={styles.profileImage} />
      </TouchableOpacity>
      
      <Button
        title="Save Changes"
        onPress={saveCharacterDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  // ... other styles
});

export default EditCharacterScreen;
