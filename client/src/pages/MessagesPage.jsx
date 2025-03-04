import { useEffect, useRef } from "react";
// import { getCurrentUser } from "../services/authService";
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
import { useCheckAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const MessagesPage = () => {
  const socket = useRef();
  const { email } = useCheckAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Connect to socket server
    socket.current = io("http://localhost:5000");

    // Setup socket connection
    if (email) {
      socket.current.on(`${email}`, ({ room, latestMessage }) => {});
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [email]);

  // style the dashboard page and then create a button to take them to messages
  return (
    <div className="flex flex-col h-screen justify-center">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
      </header>
      <div className=" rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Welcome to your messages</h2>
        <p className="text-gray-600">All Your Messages Appear Here</p>
      </div>
      <main className="flex-1 p-4">
        <Button
          onClick={() => {
            navigate("/messages");
          }}
        >
          {" "}
          Messages{" "}
        </Button>
      </main>
    </div>
  );
};

export default MessagesPage;
