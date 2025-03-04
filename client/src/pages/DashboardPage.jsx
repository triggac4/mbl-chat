import { useState, useEffect, useRef } from 'react';
import { getCurrentUser } from '../services/authService';
import { getUserRooms, createRoom } from '../services/roomService';
import { getRoomMessages, sendMessage, markMessagesAsRead } from '../services/messageService';
import { searchUsers } from '../services/userService';
import { io } from 'socket.io-client';
import {
  FaSearch,
  FaUserPlus,
  FaPaperPlane,
  FaEllipsisV,
  FaTimes,
} from 'react-icons/fa';

const DashboardPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showNewChat, setShowNewChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const socket = useRef();
  const messagesEndRef = useRef(null);
  const currentUser = getCurrentUser()?.user;
  
  useEffect(() => {
    // Connect to socket server
    socket.current = io('http://localhost:5000');
    
    // Setup socket connection
    if (currentUser) {
      socket.current.emit('setup', currentUser);
      
      socket.current.on('message received', (newMessage) => {
        if (selectedRoom?._id === newMessage.room) {
          setMessages((prev) => [...prev, newMessage]);
          markMessagesAsRead(newMessage.room);
        }
      });
      
      socket.current.on('room updated', ({ room, latestMessage }) => {
        setRooms((prev) =>
          prev.map((r) =>
            r._id === room ? { ...r, latestMessage } : r
          )
        );
      });
    }
    
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser, selectedRoom]);
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await getUserRooms();
        if (response.success) {
          setRooms(response.rooms);
        }
      } catch (error) {
        setError('Failed to load conversations');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, []);
  
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedRoom) {
        try {
          setLoading(true);
          const response = await getRoomMessages(selectedRoom._id);
          if (response.success) {
            setMessages(response.messages);
            await markMessagesAsRead(selectedRoom._id);
          }
        } catch (error) {
          setError('Failed to load messages');
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchMessages();
  }, [selectedRoom]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const response = await searchUsers(searchQuery);
      if (response.success) {
        setSearchResults(response.users);
      }
    } catch (error) {
      setError('Failed to search users');
      console.error(error);
    }
  };
  
  const handleCreateChat = async (userId) => {
    try {
      const response = await createRoom({
        participants: [userId],
      });
      
      if (response.success) {
        setRooms((prev) => [response.room, ...prev]);
        setSelectedRoom(response.room);
        setShowNewChat(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    } catch (error) {
      setError('Failed to create chat');
      console.error(error);
    }
  };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedRoom) return;
    
    try {
      const messageData = {
        content: newMessage,
        roomId: selectedRoom._id,
      };
      
      // Emit socket event
      socket.current.emit('new message', {
        ...messageData,
        sender: currentUser._id,
      });
      
      // Send to backend
      const response = await sendMessage(messageData);
      
      if (response.success) {
        setNewMessage('');
      }
    } catch (error) {
      setError('Failed to send message');
      console.error(error);
    }
  };
  
  if (loading && !rooms.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex h-[calc(100vh-12rem)] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 border-r">
          {/* Search and New Chat */}
          <div className="p-4 border-b">
            <button
              onClick={() => setShowNewChat(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              New Chat
            </button>
          </div>
          
          {/* Conversations List */}
          <div className="h-full overflow-y-auto">
            {rooms.map((room) => (
              <div
                key={room._id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedRoom?._id === room._id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">
                      {room.isGroupChat
                        ? room.name
                        : room.participants.find(
                            (p) => p._id !== currentUser._id
                          )?.username}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {room.latestMessage?.content || 'No messages yet'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {selectedRoom.isGroupChat
                      ? selectedRoom.name
                      : selectedRoom.participants.find(
                          (p) => p._id !== currentUser._id
                        )?.username}
                  </h2>
                  <button className="text-gray-600 hover:text-gray-800">
                    <FaEllipsisV />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`mb-4 flex ${
                      message.sender._id === currentUser._id
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[70%] ${
                        message.sender._id === currentUser._id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
      
      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Chat</h2>
              <button
                onClick={() => {
                  setShowNewChat(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-4 flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search users..."
                className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FaSearch />
              </button>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded"
                >
                  <div>
                    <h3 className="font-medium">{user.username}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleCreateChat(user._id)}
                    className="p-2 text-blue-600 hover:text-blue-700"
                  >
                    <FaUserPlus />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;