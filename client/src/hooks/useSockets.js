/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocketConnection = ({ onNewMessage, dependency = [] }) => {
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    console.log("connecting socket");
    socket.current.on("newMessage", (msg) => {
      onNewMessage(msg);
    });
    return () => {
      if (socket?.current) {
        console.log("Disconnecting socket");
        socket?.current?.disconnect();
      }
    };
  }, dependency);
};
