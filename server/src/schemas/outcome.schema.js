import { z } from "zod";

export const createOutcomeSchema = z.object({
  patientName: z
    .string({ required_error: "Patient name is required" })
    .trim()
    .min(1, "Patient name is required")
    .max(100, "Patient name too long"),
  painScore: z.coerce
    .number({ required_error: "Pain score is required" })
    .int("Pain score must be a whole number")
    .min(1, "Pain score must be at least 1")
    .max(10, "Pain score must be at most 10"),
  mobilityScore: z.coerce
    .number({ required_error: "Mobility score is required" })
    .int("Mobility score must be a whole number")
    .min(1, "Mobility score must be at least 1")
    .max(10, "Mobility score must be at most 10"),
  dateRecorded: z
    .string({ required_error: "Date is required" })
    .min(1, "Date is required")
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
});
