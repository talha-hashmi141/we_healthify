import { Router } from "express";
import { login, getMe } from "../controllers/auth.controller.js";
import { loginSchema } from "../schemas/auth.schema.js";
import validate from "../middleware/validate.middleware.js";
import authenticate from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/login", authLimiter, validate(loginSchema), login);
router.get("/me", authenticate, getMe);

export default router;
