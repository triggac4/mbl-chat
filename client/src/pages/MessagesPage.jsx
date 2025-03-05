import "react";
// import { useCheckAuth } from "../hooks/useAuth";

// Import the reusable components
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import { useGetMessages, useSendMessage } from "../hooks/useMessages";
import { useEffect, useState } from "react";
import { useSocketConnection } from "../hooks/useSockets";
const MessagesPage = () => {
  const { mutateAsync, isLoading } = useSendMessage();

  // const queryClient = useQueryClient();

  const [messages, setMessages] = useState([]);
  const { data, isLoading: messageLoading } = useGetMessages();

  // console.log({ data, isPending });

  useSocketConnection({
    onNewMessage: (msg) => {
      // refetch();
      setMessages((pre) => [...pre, msg]);
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setMessages(data?.messages || []);
    }
  }, [data?.messages, isLoading]);
  // Function to handle sending a new message
  const handleSendNewMessage = async (messageContent, email) => {
    const newMessage = {
      message: messageContent,
      email,
    };

    await mutateAsync(newMessage);
  };

  return (
    <div
      className="flex flex-col bg-gray-100 mb-3"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <header className="bg-white shadow p-4 h-6">
        <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
      </header>

      <div className="flex flex-col flex-1 overflow-hidden ">
        {/* Using the reusable MessageList component */}
        <MessageList messages={messages} isLoading={messageLoading} />

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
