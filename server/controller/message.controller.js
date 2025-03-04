//create message
// get all messages in a room

import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const createMessage = async (req, res) => {
  const { message, email } = req.body;
  const { user } = req;
  const receiver = await User.findOne({ email });
  if (!receiver) {
    res.status(404);
    throw new Error("Room not found");
  }
  if (receiver._id.equals(user._id)) {
    res.status(400);
    throw new Error("You cannot send a message to yourself");
  }
  const newMessage = Message.create({
    sender: user._id,
    content: message,
    receiver: receiver._id,
  });
  res.status(201).json(newMessage);
  console.log(newMessage);
  console.log(user);
};

const getAllMessages = async (req, res) => {
  const user = req.user;

  const messages = await Message.find({
    $or: [{ receiver: user._id }, { sender: user._id }],
  });
  res.status(200).json(messages);
};

const getAllUnreadMessages = async (req, res) => {
  const user = req.user;

  const messages = await Message.find({
    receiver: user._id,
    createdAt: { $gt: user.lastMessagesView },
  });
};

export { createMessage, getAllMessages, getAllUnreadMessages };
