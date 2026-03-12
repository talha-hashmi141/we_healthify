import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import config from "./config/index.js";
import "./models/Clinic.model.js";
import "./models/User.model.js";
import "./models/Outcome.model.js";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/rateLimiter.js";
import sanitize from "./middleware/sanitize.middleware.js";
import requestId from "./middleware/requestId.middleware.js";
import requestLogger from "./middleware/requestLogger.middleware.js";

const app = express();

app.use(requestId);
app.use(helmet());
app.use(cors({ origin: config.client.url, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(sanitize);
app.use(requestLogger);

app.use("/api", globalLimiter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", routes);

app.use(errorHandler);

export default app;
