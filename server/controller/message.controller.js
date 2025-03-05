//create message
// get all messages in a room

import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const createMessage = async (req, res) => {
  const { message, email } = req.body;
  const { user } = req;
  const IO = req.app.get("IO");
  let receiver;
  if (email) {
    receiver = await User.findOne({ email });

    if (!receiver) {
      res.status(404);
      throw new Error("Room not found");
    }

    if (receiver._id.equals(user._id)) {
      res.status(400);
      throw new Error("You cannot send a message to yourself");
    }
  }
  const newMessage = await Message.create({
    sender: user._id,
    content: message,
    receiver: receiver?._id,
    forAll: !email,
  });
  await User.findByIdAndUpdate(user._id, { lastMessagesView: Date.now() });
  const doc = newMessage.toObject();
  doc.sender = user;
  IO.sockets.emit("newMessage", doc);
  res.status(201).json({ newMessage });
};

const getAllMessages = async (req, res) => {
  const user = req.user;

  const messages = await Message.find({
    $or: [{ receiver: user._id }, { sender: user._id }, { forAll: true }],
  }).populate("sender");
  await User.findByIdAndUpdate(user._id, { lastMessagesView: Date.now() });
  res.status(200).json({ messages });
};

const getAllUnreadMessageCount = async (req, res) => {
  const user = req.user;

  const messages = await Message.find({
    $and: [
      {
        createdAt: { $gt: user.lastMessagesView },
      },
      { $or: [{ receiver: user._id }, { sender: user._id }, { forAll: true }] },
    ],
  }).countDocuments();
  res.status(200).json({ unreadMessageCount: messages });
};

export { createMessage, getAllMessages, getAllUnreadMessageCount };
