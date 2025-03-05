import "react";
import PropTypes from "prop-types";
import { useCheckAuth } from "../../hooks/useAuth";

export const MessageComponent = ({ msg = {} }) => {
  const { email } = useCheckAuth();
  const isCurrentUser = msg?.sender?.email === email;

  return (
    <div
      className={`flex ${
        isCurrentUser ? "justify-end ml-4" : "justify-start mr-4"
      }`}
    >
      <div
        className={`max-w-xs md:max-w-md p-3 rounded-lg ${
          isCurrentUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {/* sender username*/}
        <p className="text-sm font-semibold pb-2 text-start">
          {msg?.sender?.username || "N/A"}
        </p>

        <p className="text-sm text-left">{msg?.content}</p>
        <p
          className={`text-xs mt-1 text-end ${
            isCurrentUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {
            //format the date
            new Date(msg?.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          }
        </p>
      </div>
    </div>
  );
};

MessageComponent.propTypes = {
  msg: PropTypes.shape({
    sender: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};
