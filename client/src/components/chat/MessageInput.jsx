import PropTypes from "prop-types";
import { FaPaperPlane } from "react-icons/fa";
import Button from "../ui/Button";

/**
 * A reusable component for message input in chat interfaces
 */
const MessageInput = ({ onSendMessage, isLoading }) => {
  return (
    <Button
      onClick={onSendMessage}
      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full fixed bottom-4 flex gap-2"
      isLoading={isLoading}
    >
      {`Send Mail  `} <FaPaperPlane className="h-5 w-5" />
    </Button>
  );
};

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default MessageInput;
