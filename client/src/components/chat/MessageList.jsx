import { useRef, useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { useGetMessages } from "../../hooks/useMessages";
import { CircleSpinner } from "../ui/Loading";
import { MessageComponent } from "./MessageComponent";
import { useSocketConnection } from "../../hooks/useSockets";
import { useQueryClient } from "@tanstack/react-query";

const MessageList = ({ messages=[], isLoading }) => {
  const messagesEndRef = useRef(null);
  const messagesData = useMemo(() => {
    // const messages = data?.messages || [];
    return messages.map((msg, index) => {
      return <MessageComponent key={`${msg._id} ${index}`} msg={msg} />;
    });
  }, [messages]);
  // Scroll to bottom of messages when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {isLoading && <CircleSpinner size="100px" />}
      {messagesData}
      <div ref={messagesEndRef} />
    </div>
  );
};
MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MessageList;
