import "react";
import PropTypes from "prop-types";
import { useCheckAuth } from "../../hooks/useAuth";

export const MessageComponent = ({ msg = {} }) => {
  const { email } = useCheckAuth();
  const isCurrentUser = msg?.sender?.email === email;
  console.log("isCurrentUser", !isCurrentUser && !msg.isRead);
  return (
    <div className={`flex mx-2 cursor-pointer`}>
      <button
        className={`w-full p-2  ${
          !isCurrentUser && !msg.isRead
            ? "bg-blue-100 text-gray-800 "
            : "bg-white text-gray-800"
        }`}
      >
        {/* sender username*/}
        <p className="text-sm font-semibold pb-2 text-start">
          {`${isCurrentUser ? "You" : msg?.sender?.username || "N/A"}`}
        </p>
        {/* message content  should have not more than 200px use eclipise*/}
        <p
          className="text-sm text-left"
          style={{
            width: "500px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <span className="font-semibold">{`${
            msg?.subject || "N/A"
          }:  `}</span>
          {`${msg?.content}`}
        </p>
        <p className={`text-xs mt-1 text-end text-gray-400`}>
          {
            //format the date
            new Date(msg?.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          }
        </p>
      </button>
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
