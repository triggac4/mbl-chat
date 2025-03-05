import {
  registerUser,
  loginUser,
  updateLastViewMessages,
} from "../controller/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /api/users/signUp:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Creates a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input data
 */
router.post("/signUp", registerUser);

/**
 * @swagger
 * /api/users/signIn:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login user
 *     description: Authenticate a user and get token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/signIn", loginUser);

/**
 * @swagger
 * /api/users/lastView:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update last viewed messages
 *     description: Update timestamp of user's last viewed messages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Last view timestamp updated successfully
 *       401:
 *         description: Not authorized
 */
router.put("/lastView", protect, updateLastViewMessages);

export default router;
