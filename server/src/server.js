import app from "./app.js";
import config from "./config/index.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`[Server] Running in ${config.env} on http://localhost:${config.port}`);
  });
};

startServer().catch((err) => {
  console.error("[Server] Failed to start:", err);
  process.exit(1);
});
