import { useRef, useEffect, useMemo } from "react";
import { useGetMessages } from "../../hooks/useMessages";
import { CircleSpinner } from "../ui/Loading";
import { MessageComponent } from "./MessageComponent";

const MessageList = () => {
  const { data, isPending } = useGetMessages();
  // console.log({ data, isPending });
  const messagesEndRef = useRef(null);

  const messagesData = useMemo(() => {
    const messages = data?.messages || [];
    return messages.map((msg, index) => {
      return <MessageComponent key={`${msg._id} ${index}`} msg={msg} />;
    });
  }, [data]);
  // Scroll to bottom of messages when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {isPending && <CircleSpinner size="100px" />}
      {messagesData}
      <div ref={messagesEndRef} />
    </div>
  );
};


export default MessageList;
