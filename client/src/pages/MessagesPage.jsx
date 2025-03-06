import "react";
// import { useCheckAuth } from "../hooks/useAuth";

// Import the reusable components
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import { useGetMessages, useSendMessage } from "../hooks/useMessages";
import { useEffect, useState } from "react";
import { useSocketConnection } from "../hooks/useSockets";
import CenterModal from "../components/modal/CenterModal";
import { MessageDetails } from "../components/chat/MessageDetails";
import SendMessageForm from "../components/forms/SendMessageForm";
const MessagesPage = () => {
  const { isLoading } = useSendMessage();

  // const queryClient = useQueryClient();

  const [messages, setMessages] = useState([]);
  const { data, isLoading: messageLoading } = useGetMessages();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sendMessage, setSendMessage] = useState(false);
  // console.log({ data, isPending });

  useSocketConnection({
    onNewMessage: (msg) => {
      // refetch();
      setMessages((pre) => {
        //find message with the same _id and replace it if none then put it to the top
        const index = pre.findIndex((m) => m._id === msg._id);
        if (index !== -1) {
          pre[index] = msg;
          return [...pre];
        }
        return [msg, ...pre];
      });
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setMessages(data?.messages || []);
    }
  }, [data?.messages, isLoading]);

  return (
    <div className="flex flex-col bg-gray-100 mb-3 h-full">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Messages: click to mark as read and view details
        </h1>
      </header>

      <div className="flex flex-col flex-1 overflow-hidden ">
        {/* Using the reusable MessageList component */}
        <MessageList
          messages={messages}
          isLoading={messageLoading}
          onClick={(msg) => setSelectedMessage(msg)}
        />

        {/* Using the reusable MessageInput component */}
        <MessageInput
          onSendMessage={() => setSendMessage(true)}
          isLoading={isLoading}
        />
      </div>
      {sendMessage && (
        <CenterModal isOpen={sendMessage} onClose={() => setSendMessage(false)}>
          <SendMessageForm onClose={() => setSendMessage(false)} />
        </CenterModal>
      )}
      {selectedMessage && (
        <CenterModal
          isOpen={selectedMessage}
          onClose={() => setSelectedMessage(false)}
        >
          <MessageDetails msg={selectedMessage} />
        </CenterModal>
      )}
    </div>
  );
};

export default MessagesPage;
