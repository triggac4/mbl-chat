/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { backendBaseUrl } from "../env";

export const useSocketConnection = ({ onNewMessage, dependency = [] }) => {
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io(backendBaseUrl);
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
