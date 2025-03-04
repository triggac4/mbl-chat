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

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Messaging App API",
      version: "1.0.0",
      description: "API for messaging application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(limiter);

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Base route
app.get("/", (req, res) => {
  res.send("Messaging App API is running");
});

// Error handling middleware
app.use(errorHandler);

export default app;
