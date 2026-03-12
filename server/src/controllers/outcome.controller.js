import outcomeService from "../services/outcome.service.js";
import { sendResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const listOutcomes = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));

  const result = await outcomeService.listByClinic(req.clinicId, { page, limit });
  sendResponse(res, 200, result, "Outcomes fetched");
});

export const createOutcome = asyncHandler(async (req, res) => {
  const outcome = await outcomeService.create({
    ...req.body,
    clinicId: req.clinicId,
    createdBy: req.user._id,
  });
  sendResponse(res, 201, { outcome }, "Outcome created");
});

export const getStats = asyncHandler(async (req, res) => {
  const stats = await outcomeService.getStats(req.clinicId);
  sendResponse(res, 200, { stats }, "Stats fetched");
});
