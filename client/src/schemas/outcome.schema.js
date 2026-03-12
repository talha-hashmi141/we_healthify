import { z } from "zod";

export const outcomeSchema = z.object({
  patientName: z
    .string({ required_error: "Patient name is required" })
    .trim()
    .min(1, "Patient name is required")
    .max(100, "Patient name too long"),
  painScore: z.coerce
    .number({ required_error: "Pain score is required" })
    .int("Must be a whole number")
    .min(1, "Min 1")
    .max(10, "Max 10"),
  mobilityScore: z.coerce
    .number({ required_error: "Mobility score is required" })
    .int("Must be a whole number")
    .min(1, "Min 1")
    .max(10, "Max 10"),
  dateRecorded: z
    .string({ required_error: "Date is required" })
    .min(1, "Date is required"),
});
