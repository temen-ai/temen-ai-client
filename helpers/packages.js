import axios from 'axios';

export const getPackages = async (token) => {
    try {

        const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/packages/`, {
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


//get package purchase link

// static async getPackagePurchaseLink(req, res, next) {
//   try {
//       const user_id = req.user;
//       const package_id = req.query.package_id;

export const getPurchaseLink = async (token,packageId) => {

  try {
    const response = await axios.get(`https://teman-ai-server-930de02b860a.herokuapp.com/packages/purchase?package_id=${packageId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Use the access token from the user object
      },
    });

    return response.data; // Return the fetched data

  } catch (error) {
    console.error('Error fetching character data:', error);

    throw error;
  }
  
}
