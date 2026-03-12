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

  countByClinicId(clinicId) {
    return Outcome.countDocuments({ clinicId });
  }

  create(data) {
    return Outcome.create(data);
  }
}

export default new OutcomeRepository();
