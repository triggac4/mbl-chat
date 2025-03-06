import { useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { CircleSpinner } from "../ui/Loading";
import { MessageComponent } from "./MessageComponent";

const MessageList = ({ messages = [], isLoading, onClick }) => {
  const messagesEndRef = useRef(null);
  const messagesData = useMemo(() => {
    // const messages = data?.messages || [];
    return messages.map((msg, index) => {
      return (
        <MessageComponent
          key={`${msg._id} ${index}`}
          msg={msg}
          onClick={onClick}
        />
      );
    });
  }, [messages, onClick]);
  // Scroll to bottom of messages when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-7">
      {isLoading && <CircleSpinner size="100px" />}
      <div ref={messagesEndRef} />
      {messagesData}
    </div>
  );
};
MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MessageList;
