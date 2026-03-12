import mongoose from "mongoose";

const outcomeSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    painScore: {
      type: Number,
      required: [true, "Pain score is required"],
      min: 1,
      max: 10,
    },
    mobilityScore: {
      type: Number,
      required: [true, "Mobility score is required"],
      min: 1,
      max: 10,
    },
    dateRecorded: {
      type: Date,
      required: [true, "Date recorded is required"],
      default: Date.now,
    },
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

outcomeSchema.index({ clinicId: 1, dateRecorded: -1 });
outcomeSchema.index({ clinicId: 1, patientName: 1 });
outcomeSchema.index({ clinicId: 1, createdAt: -1 });

export default mongoose.model("Outcome", outcomeSchema);
