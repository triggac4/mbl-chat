//user controller,.. sign in sign up

import User from "../models/userModel.js";
import { generateToken } from "../utils/tokenUtil.js";
 
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};
//sign in
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordMatch = await user.comparePassword(password);
  //password verify
  if (user && passwordMatch) {
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

const updateLastViewMessages = async (req, res) => {
  const user = req.user;
  user.lastMessagesView = Date.now();
  await user.save();
  res.status(200).json({ message: "Last messages view updated" });
};
export { registerUser, loginUser, updateLastViewMessages };
