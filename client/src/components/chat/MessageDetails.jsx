import "react";
import PropTypes from "prop-types";
import { useCheckAuth } from "../../hooks/useAuth";

export const MessageDetails = ({ msg = {} }) => {
  const { email } = useCheckAuth();
  const isCurrentUser = msg?.sender?.email === email;
  //call markedAsRead
  return (
    <div className={`flex mx-4 gap-5 flex-1 justify-center items-center`}>
      <div className={`w-full p-3`}>
        {/* sender username*/}
        <p className="text-2xl font-semibold pb-2 text-start">
          {`${msg?.subject || "N/A"}`}
        </p>
        {/* message content  should have not more than 200px use eclipise*/}
        <p className="text-l text-left">{msg?.content}</p>
        <p className={`text-xs mt-1 text-end text-blue-500`}>
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

MessageDetails.propTypes = {
  msg: PropTypes.shape({
    sender: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};
