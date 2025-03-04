import api from "./apiService";

// Send a message
export const sendMessage = async (messageData) => {
  const response = await api.post("/messages", messageData);
  return response.data;
};

// Get all messages in a room
export const getMessages = async (roomId) => {
  const response = await api.get(`/messages/${roomId}`);
  return response.data;
};

// Mark messages as read
export const markMessagesAsRead = async (roomId) => {
  const response = await api.put(`/messages/read/${roomId}`);
  return response.data;
};
