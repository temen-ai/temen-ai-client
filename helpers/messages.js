import axios from 'axios';

export const sendMessageToAI = async (token,characterId,userPrompt) => {
    try {
        console.log(token,characterId,userPrompt,"yeyy0y")
        const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/openai/?character_id=${characterId}&prompt=${encodeURIComponent(userPrompt)}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the access token from the user object
          },
        });
        
        return response.data.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching character data:', error);
        // Consider throwing the error or returning a specific error structure
        throw error;
    }
};

export const fetchMessagesData = async (token, characterId) => {
    try {
      const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/messages/${characterId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the access token from the user object
        },
      });
      console.log(response.data, "Messages fetched successfully");
      return response.data.data; // Set character data from backend response
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error appropriately
      throw error;
    }
  };