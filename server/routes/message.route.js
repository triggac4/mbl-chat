import {
  createMessage,
  getAllMessages,
  getAllUnreadMessages,
} from "../controller/message.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.route("/").post(createMessage).get(protect, getAllMessages);
router.get("/unread", protect, getAllUnreadMessages);

export default router;
