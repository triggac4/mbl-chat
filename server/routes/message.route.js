import {
  createMessage,
  getAllMessages,
  getAllUnreadMessageCount,
  markMessageAsRead,
} from "../controller/message.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/messages:
 *   post:
 *     tags:
 *       - Messages
 *     summary: Create a new message
 *     description: Send a new message to a user or broadcast to all
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               receiver:
 *                 type: string
 *                 description: User ID of receiver (optional)
 *               forAll:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Message created successfully
 *       401:
 *         description: Not authorized
 *   get:
 *     tags:
 *       - Messages
 *     summary: Get all messages
 *     description: Retrieve all messages for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of messages
 *       401:
 *         description: Not authorized
 */
router.route("/").post(protect, createMessage).get(protect, getAllMessages);

/**
 * @swagger
 * /api/messages/unreadCount:
 *   get:
 *     tags:
 *       - Messages
 *     summary: Get unread message count
 *     description: Get the count of unread messages for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread message count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *       401:
 *         description: Not authorized
 */
router.get("/unreadCount", protect, getAllUnreadMessageCount);
router.get("/markAsRead/:id", protect, markMessageAsRead);

export default router;
