import authService from "../services/auth.service.js";
import { sendResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  sendResponse(res, 200, data, "Login successful");
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user._id);
  sendResponse(res, 200, { user }, "Profile fetched");
});
