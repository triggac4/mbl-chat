/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { backendBaseUrl } from "../env";
import { useCheckAuth } from "./useAuth";

export const useSocketConnection = ({ onNewMessage, dependency = [] }) => {
  const socket = useRef(null);
  const { _id } = useCheckAuth();
  console.log({ _id });
  useEffect(() => {
    socket.current = io(backendBaseUrl);
    console.log("connecting socket");
    socket.current.on(_id, (msg) => {
      onNewMessage(msg);
    });
    return () => {
      if (socket?.current) {
        console.log("Disconnecting socket");
        socket?.current?.disconnect();
      }
    };
  }, [...dependency, _id]);
};
