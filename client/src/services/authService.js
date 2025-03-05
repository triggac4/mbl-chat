// Get current user
export const getUserToken = () => {
  return localStorage.getItem('token');
};

// Get auth token for API calls
export const getAuthHeader = () => {
  const token = getUserToken();
  
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};