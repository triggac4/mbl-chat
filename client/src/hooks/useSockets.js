import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocketConnection = ({ onNewMessage }) => {
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.on("newMessage", (msg) => {
      onNewMessage(msg);
    });
    return () => {
      if (socket?.current) {
        socket?.current?.disconnect();
      }
    };
  }, []);
};
