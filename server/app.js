import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

// Import routes
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

// Initialize express app
const app = express();

// Import Swagger documentation
import { swaggerDocs } from './swagger.js';

// Rate limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 300, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

// Swagger configuration is now handled in swagger.js

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(limiter);

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Initialize Swagger documentation
swaggerDocs(app);

// Swagger documentation is initialized in swaggerDocs(app) above

// Base route
app.get("/", (req, res) => {
  res.send("Messaging App API is running");
});

// Error handling middleware
app.use(errorHandler);

export default app;
