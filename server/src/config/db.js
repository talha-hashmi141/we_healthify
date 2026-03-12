import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  const conn = await mongoose.connect(config.mongo.uri);
  console.log(`[DB] Connected: ${conn.connection.host}`);
};

export default connectDB;
