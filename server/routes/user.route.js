import {
  registerUser,
  loginUser,
  updateLastViewMessages,
} from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/signUp", registerUser);
router.post("/signIn", loginUser);
router.put("/lastView", protect, updateLastViewMessages);

export default router;
