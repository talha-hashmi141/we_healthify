import jwt from "jsonwebtoken";
import config from "../config/index.js";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication required");
  }

  const token = header.split(" ")[1];
  const decoded = jwt.verify(token, config.jwt.secret);

  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(401, "User no longer exists");

  req.user = user;
  req.clinicId = user.clinicId;
  next();
});

export default authenticate;
