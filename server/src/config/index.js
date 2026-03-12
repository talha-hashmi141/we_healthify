import dotenv from "dotenv";
dotenv.config();

const config = Object.freeze({
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 5050,
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/we_healthify",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  client: {
    url: process.env.CLIENT_URL || "http://localhost:5173",
  },
});

export default config;
