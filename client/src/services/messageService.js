import api from './apiService';

// Send a message
export const sendMessage = async (messageData) => {
  try {
    const response = await api.post('/messages', messageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all messages in a room
export const getRoomMessages = async (roomId) => {
  try {
    const response = await api.get(`/messages/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update message
export const updateMessage = async (id, content) => {
  try {
    const response = await api.put(`/messages/${id}`, { content });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete message
export const deleteMessage = async (id) => {
  try {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mark messages as read
export const markMessagesAsRead = async (roomId) => {
  try {
    const response = await api.put(`/messages/read/${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};