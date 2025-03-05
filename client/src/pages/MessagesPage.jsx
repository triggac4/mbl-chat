import "react";
import { useCheckAuth } from "../hooks/useAuth";

// Import the reusable components
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import { useSendMessage } from "../hooks/useMessages";
import { useSocketConnection } from "../hooks/useSockets";
import { useQueryClient } from "@tanstack/react-query";

const MessagesPage = () => {
  const { email } = useCheckAuth();
  const { mutateAsync, isLoading } = useSendMessage();
  const queryClient = useQueryClient();
  useSocketConnection({
    onNewMessage: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  // Function to handle sending a new message
  const handleSendNewMessage = async (messageContent, email) => {
    const newMessage = {
      message: messageContent,
      email,
    };

    await mutateAsync(newMessage);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
      </header>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Using the reusable MessageList component */}
        <MessageList currentUserEmail={email} />

        {/* Using the reusable MessageInput component */}
        <MessageInput
          onSendMessage={handleSendNewMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default MessagesPage;
