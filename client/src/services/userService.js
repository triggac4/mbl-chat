import api from './apiService';

// Search users
export const searchUsers = async (query) => {
  try {
    const response = await api.get(`/users/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/auth/updateprofile', profileData);
    
    // Update local storage with new user data
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user.user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const response = await api.put('/auth/changepassword', passwordData);
    
    // Update token in local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && response.data.token) {
      user.token = response.data.token;
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};