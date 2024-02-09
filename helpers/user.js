import axios from 'axios';

export const getUser = async (token) => {
    try {

        const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/users/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the access token from the user object
          },
        });
        
        return response.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching character data:', error);
        // Consider throwing the error or returning a specific error structure
        throw error;
    }
};

export const updateUser = async (token, username, description,pfp,social_link,promo_code) => {
    try {
        const response = await axios.post(`https://teman-ai-server-930de02b860a.herokuapp.com/users/`, {
          username: username,
          description: description,
          pfp: pfp,
          social_link: social_link,
          promo_code: promo_code
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the access token from the user object
          },
        });
        
        return response.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching character data:', error);
        // Consider throwing the error or returning a specific error structure
        throw error;
    }
}

export const getUserProfile = async (token, userId) => {
    try {
        const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the provided token
            },
        });

        return response.data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching character data:', error);
        // Consider throwing the error or returning a specific error structure
        throw error;
    }
}