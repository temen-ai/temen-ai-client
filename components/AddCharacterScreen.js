import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';

const AddCharacterScreen = ({ route, navigation }) => {


  const [formData, setFormData] = useState({
    prompt: "",
    welcomeMessage: "",
    name: "",
    profilePicture: "https://ayviizcviexxanfbiwek.supabase.co/storage/v1/object/public/pfp/%20.png", // assuming character.pfp is the link to the profile picture
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>Profile Picture</Text>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={{ uri: formData.profilePicture }} style={styles.profileImage} />
        </TouchableOpacity>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          placeholder="Enter name"
          placeholderTextColor="#757575"
        />

        <Text style={styles.label}>Prompt</Text>
        <TextInput
          style={styles.input}
          value={formData.prompt}
          onChangeText={(text) => handleInputChange('prompt', text)}
          placeholder="Enter prompt"
          placeholderTextColor="#757575"
          multiline
        />

        <Text style={styles.label}>Welcome Message</Text>
        <TextInput
          style={styles.input}
          value={formData.welcomeMessage}
          onChangeText={(text) => handleInputChange('welcomeMessage', text)}
          placeholder="Enter welcome message"
          placeholderTextColor="#757575"
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={saveCharacterDetails}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  // ... other styles
});

export default AddCharacterScreen;
