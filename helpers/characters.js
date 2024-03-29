import axios from 'axios';

/**
 * Fetches character data from the backend.
 * @param {string} token User's access token.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 */
export const fetchActiveCharacters = async (token) => {
    try {
        const response = await axios.get('https://teman-ai-server-930de02b860a.herokuapp.com/characters/active/', {
            headers: {
                Authorization: `Bearer ${token}`, // Use the provided token
            },
        });

        return response.data.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching character data:', error);
        // Consider throwing the error or returning a specific error structure
        throw error;
    }
};
export const fetchAllCharacters = async (token,searchTerm, limit, offset) => {
    try {
        const params = new URLSearchParams({
            searchTerm: searchTerm,
            limit: limit,
            offset: offset
          }).toString();
      
          const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/characters/?${params}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
      return response.data.data;
    } catch (error) {
      console.error('Error fetching character data:', error);
      throw error;
    }
  };
  

export const fetchUserCharacters = async (token, userId) => {
    try {
        const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/characters/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the provided token
            },
        });

        return response.data.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching character data:', error);
        // Consider throwing the error or returning a specific error structure
        throw error;
    }
}

export const createCharacter = async (token, name, description, prompt, pfp, welcomeMessage, isPublic) => {
    try {
        const response = await axios.post('https://teman-ai-server-930de02b860a.herokuapp.com/characters/', {
            name: name,
            description: description,
            prompt: prompt,
            pfp: pfp,
            welcome_message: welcomeMessage,
            is_public: isPublic,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the provided token
            },
        });

        return response.data.data; // Return the fetched data
    } catch (error) {
        console.error('Error creating character:', error);
        // Consider throwing the error or returning a specific error structure
        throw error;
    }
}

export const updateCharacter = async (token, id, name, description, prompt, pfp, welcomeMessage, isPublic) => {
    try {
        const response = await axios.put(`https://teman-ai-server-930de02b860a.herokuapp.com/characters/${id}`, {
            name: name,
            description: description,
            prompt: prompt,
            pfp: pfp,
            welcome_message: welcomeMessage,
            is_public: isPublic,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the provided token
            },
        });

        return response.data.data; // Return the fetched data
    } catch (error) {
        console.error('Error updating character:', error);
        // Consider throwing the error or returning a specific error structure
        throw error;
    }
}