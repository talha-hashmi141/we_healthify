import { Router } from "express";
import { listOutcomes, createOutcome } from "../controllers/outcome.controller.js";
import { createOutcomeSchema } from "../schemas/outcome.schema.js";
import validate from "../middleware/validate.middleware.js";
import authenticate from "../middleware/auth.middleware.js";
import { tenantLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.use(authenticate);
router.use(tenantLimiter);

router.get("/", listOutcomes);
router.post("/", validate(createOutcomeSchema), createOutcome);

export default router;
