import mongoose from "mongoose";
import config from "./config/index.js";
import Clinic from "./models/Clinic.model.js";
import User from "./models/User.model.js";
import Outcome from "./models/Outcome.model.js";

const seed = async () => {
  await mongoose.connect(config.mongo.uri);
  console.log("[Seed] Connected to DB");

  // Clear existing data
  await Promise.all([Clinic.deleteMany(), User.deleteMany(), Outcome.deleteMany()]);
  console.log("[Seed] Cleared existing data");

  // Create clinics
  const [clinicA, clinicB] = await Clinic.insertMany([
    { name: "Downtown Physical Therapy", address: "123 Main St, Suite 100" },
    { name: "Westside Sports Medicine", address: "456 Oak Ave, Building B" },
  ]);

  // Create users (password is hashed via pre-save hook)
  const [userA, userB] = await Promise.all([
    User.create({ name: "Dr. Sarah Chen", email: "admin@downtown.com", password: "password123", clinicId: clinicA._id }),
    User.create({ name: "Dr. Mike Ross", email: "admin@westside.com", password: "password123", clinicId: clinicB._id }),
  ]);

  // Sample outcomes for Clinic A
  const clinicAOutcomes = [
    { patientName: "John Smith", painScore: 7, mobilityScore: 4, dateRecorded: new Date("2025-03-01") },
    { patientName: "Jane Doe", painScore: 3, mobilityScore: 8, dateRecorded: new Date("2025-03-05") },
    { patientName: "John Smith", painScore: 5, mobilityScore: 6, dateRecorded: new Date("2025-03-10") },
    { patientName: "Alice Brown", painScore: 8, mobilityScore: 3, dateRecorded: new Date("2025-03-12") },
    { patientName: "Jane Doe", painScore: 2, mobilityScore: 9, dateRecorded: new Date("2025-03-15") },
  ];

  // Sample outcomes for Clinic B
  const clinicBOutcomes = [
    { patientName: "Tom Wilson", painScore: 6, mobilityScore: 5, dateRecorded: new Date("2025-03-02") },
    { patientName: "Emma Davis", painScore: 4, mobilityScore: 7, dateRecorded: new Date("2025-03-06") },
    { patientName: "Tom Wilson", painScore: 3, mobilityScore: 8, dateRecorded: new Date("2025-03-11") },
    { patientName: "Olivia Lee", painScore: 9, mobilityScore: 2, dateRecorded: new Date("2025-03-13") },
    { patientName: "Emma Davis", painScore: 2, mobilityScore: 9, dateRecorded: new Date("2025-03-16") },
  ];

  await Outcome.insertMany([
    ...clinicAOutcomes.map((o) => ({ ...o, clinicId: clinicA._id, createdBy: userA._id })),
    ...clinicBOutcomes.map((o) => ({ ...o, clinicId: clinicB._id, createdBy: userB._id })),
  ]);

  console.log("[Seed] Data seeded successfully:");
  console.log("  Clinic A: Downtown Physical Therapy");
  console.log("    User: admin@downtown.com / password123");
  console.log("  Clinic B: Westside Sports Medicine");
  console.log("    User: admin@westside.com / password123");

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("[Seed] Failed:", err);
  process.exit(1);
});
