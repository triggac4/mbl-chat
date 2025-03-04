import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../services/authService";
// import { getUserRooms, createRoom } from '../services/roomService';
// import { getRoomMessages, sendMessage, markMessagesAsRead } from '../services/messageService';
// import { searchUsers } from '../services/userService';
import { io } from "socket.io-client";
import {
  FaSearch,
  FaUserPlus,
  FaPaperPlane,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";

const DashboardPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
 

  const socket = useRef();
  const messagesEndRef = useRef(null);
  const currentUser = getCurrentUser()?.user;

  useEffect(() => {
    // Connect to socket server
    socket.current = io("http://localhost:5000");

    // Setup socket connection
    if (currentUser) {
      socket.current.emit("setup", currentUser);

      socket.current.on("room updated", ({ room, latestMessage }) => {

      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser, selectedRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  return <div>Dashboard Page</div>;
};

export default DashboardPage;
