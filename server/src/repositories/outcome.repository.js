import Outcome from "../models/Outcome.model.js";

class OutcomeRepository {
  findByClinicId(clinicId, { page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit;
    return Outcome.find({ clinicId })
      .sort({ dateRecorded: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name")
      .lean();
  }

  findById(id) {
    return Outcome.findById(id).populate("createdBy", "name").lean();
  }

  countByClinicId(clinicId) {
    return Outcome.countDocuments({ clinicId });
  }

  create(data) {
    return Outcome.create(data);
  }

  async getClinicStats(clinicId) {
    const [result] = await Outcome.aggregate([
      { $match: { clinicId } },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          uniquePatients: { $addToSet: "$patientName" },
          avgPain: { $avg: "$painScore" },
          avgMobility: { $avg: "$mobilityScore" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRecords: 1,
          uniquePatients: { $size: "$uniquePatients" },
          avgPain: { $round: ["$avgPain", 1] },
          avgMobility: { $round: ["$avgMobility", 1] },
        },
      },
    ]);
    return result || { totalRecords: 0, uniquePatients: 0, avgPain: 0, avgMobility: 0 };
  }
}

export default new OutcomeRepository();
