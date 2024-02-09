// CharacterPreviewBar.js
import React, { useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CharacterPreviewBar = ({ name, description, profilePic, messages_count }) => {
  const default_pfp = require("../assets/placeholderpfp.jpg")
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const formatCount = (num) => {
    if (!num) return '0';
    if (num < 1000) return num.toString();
    if (num < 1000000) return (num / 1000).toFixed(num < 10000 ? 1 : 0) + 'k';
    return (num / 1000000).toFixed(num < 10000000 ? 1 : 0) + 'M';
  };

  return (
    <View style={styles.container}>
      {!isImageLoaded && (
        <View style={styles.placeholderImage} />
      )}
      <Image
        source={profilePic ? { uri: profilePic } : default_pfp}
        style={isImageLoaded ? styles.profilePic : { ...styles.profilePic, opacity: 0 }}
        onLoad={() => setIsImageLoaded(true)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'> {name} </Text>
        <Text style={styles.description} numberOfLines={4} ellipsizeMode='tail'>{description}</Text>
      </View>
      <View style={styles.messageCountContainer}>
        <MaterialIcons name="message" size={20} color="white" />
        {messages_count? <Text style={styles.messageCountText}>{formatCount(messages_count)}</Text>:null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '95%',
    maxWidth:'100%',
    alignItems: 'center', // Align items in the center vertically
    
  },
  profilePic: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
    borderRadius: 10, // Make it round
    marginRight: 10, // Add some margin between the image and the text
  },
  placeholderImage: {
    // Styles similar to your loading placeholder's image
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
    borderRadius: 10, // Make it round
    marginRight: 10, // Add some margin between the image and the text
    backgroundColor: '#2a2a2a',
  },
  textContainer: {
    flex: 1, // Take up the remaining space
    textAlign: 'left',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
  },
  messageCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5, // Adjust as necessary
  },
  messageCountText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5, // Adjust as necessary
  },
});

export default CharacterPreviewBar;
