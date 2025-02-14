import express from "express";
import "express-async-errors";
import xss from "xss-clean";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv/config";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import talentRouter from "./routes/talentRoutes.js";
import userProfileRouter from "./routes/userProfileRoutes.js";
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlingMiddleware from "./middleware/errorHandling.js";
import cors from "cors";

import authenticationMiddleware from "./middleware/authentication.js";

const PORT = process.env.PORT || 7500;
const createApp = () => {
  const app = express();

  // Set the allowed origins for CORS
  const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PATCH,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };
  app.use((req, res, next) => {
    express.json()(req, res, next);
  });
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(xss());
  app.use(mongoSanitize());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // Routes
  app.get("/api/v1", (req, res) => {
    res.json({ message: "api route" });
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/talents", authenticationMiddleware, talentRouter);
  app.use("/api/v1/users", authenticationMiddleware, userProfileRouter);

  app.use(notFoundMiddleware);
  app.use(errorHandlingMiddleware);

  connectDB();
  return app;
};
// Create the app
const app = createApp();

// Listen on the specified port
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

// Export the app and other constants
export default app;
