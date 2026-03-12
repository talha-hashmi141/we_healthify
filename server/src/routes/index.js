import { Router } from "express";
import authRoutes from "./auth.routes.js";
import outcomeRoutes from "./outcome.routes.js";

const router = Router();

router.use("/v1/auth", authRoutes);
router.use("/v1/outcomes", outcomeRoutes);

router.use("/auth", authRoutes);
router.use("/outcomes", outcomeRoutes);

export default router;
