//create message
// get all messages in a room

import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const createMessage = async (req, res) => {
  const { message, email, subject } = req.body;
  const { user } = req;
  const IO = req.app.get("IO");
  let receiver;
  receiver = await User.findOne({ email: `${email}`.toLowerCase().trim() });

  if (!receiver) {
    res.status(404);
    throw new Error("No User email found");
  }

  if (receiver._id.equals(user._id)) {
    res.status(400);
    throw new Error("You cannot send a message to yourself");
  }

  const newMessage = await Message.create({
    sender: user._id,
    subject,
    content: message,
    receiver: receiver?._id,
    forAll: !email,
  });
  await User.findByIdAndUpdate(user._id, { lastMessagesView: Date.now() });
  const doc = newMessage.toObject();
  doc.sender = user;
  IO.sockets.emit(user?._id?.toString(), doc);
  IO.sockets.emit(receiver?._id?.toString(), doc);
  res.status(201).json({ newMessage });
};

const getAllMessages = async (req, res) => {
  const user = req.user;

  const messages = await Message.find({
    $or: [{ receiver: user._id }, { sender: user._id }],
  }).sort({ createdAt: -1 }).populate("sender");
  await User.findByIdAndUpdate(user._id, { lastMessagesView: Date.now() });
  res.status(200).json({ messages });
};
const markMessageAsRead = async (req, res) => {
  const messageId = req.params.id;
  const IO = req.app.get("IO");
  const messages = await Message.findOneAndUpdate(
    {
      _id: messageId,
      receiver: req?.user?._id,
    },
    {
      isRead: true,
    },
    {
      new: true,
    }
  );
  if (!messages) {
    res.status(404);
    throw new Error("Message not found");
  }
  // console.log({ messages: messages?.receiver?._id?.toString() });
  IO.sockets.emit(messages?.receiver?._id?.toString(), messages);
  IO.sockets.emit(messages?.sender?._id?.toString(), messages);
  res.status(200).json({ messages });
};

const getAllUnreadMessageCount = async (req, res) => {
  const user = req.user;

  const messages = await Message.find({
    receiver: user._id,
  });
  const isUnread = messages.filter((msg) => !msg.isRead);
  res.status(200).json({
    unreadMessageCount: isUnread.length,
    totalMessageCount: messages.length,
  });
};

export {
  createMessage,
  getAllMessages,
  getAllUnreadMessageCount,
  markMessageAsRead,
};
