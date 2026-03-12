import jwt from "jsonwebtoken";
import config from "../config/index.js";
import userRepository from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { toLoginResponseDTO, toUserDTO } from "../dto/auth.dto.js";

class AuthService {
  generateToken(userId, clinicId) {
    return jwt.sign(
      { id: userId, clinicId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new ApiError(401, "Invalid credentials");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const token = this.generateToken(user._id, user.clinicId);
    const populated = await userRepository.findByIdPopulated(user._id);
    return toLoginResponseDTO(populated, token);
  }

  async getProfile(userId) {
    const user = await userRepository.findByIdPopulated(userId);
    if (!user) throw new ApiError(404, "User not found");
    return toUserDTO(user);
  }
}

export default new AuthService();
