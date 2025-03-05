import { useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane } from "react-icons/fa";
import Button from "../ui/Button";

/**
 * A reusable component for message input in chat interfaces
 */
const MessageInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center">
        <textarea
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
        />
        <Button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
          isLoading={isLoading}
        >
          <FaPaperPlane className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default MessageInput;
