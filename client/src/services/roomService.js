import api from './apiService';

// Create a new room
export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/rooms', roomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user's rooms
export const getUserRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get room by ID
export const getRoomById = async (id) => {
  try {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update room
export const updateRoom = async (id, roomData) => {
  try {
    const response = await api.put(`/rooms/${id}`, roomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete room
export const deleteRoom = async (id) => {
  try {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add user to room
export const addUserToRoom = async (roomId, userId) => {
  try {
    const response = await api.post(`/rooms/${roomId}/users`, { userId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove user from room
export const removeUserFromRoom = async (roomId, userId) => {
  try {
    const response = await api.delete(`/rooms/${roomId}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};