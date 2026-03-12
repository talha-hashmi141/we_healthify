import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Clinic name is required"],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Clinic", clinicSchema);
