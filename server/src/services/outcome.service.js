import outcomeRepository from "../repositories/outcome.repository.js";
import { toOutcomeListDTO } from "../dto/outcome.dto.js";

class OutcomeService {
  async listByClinic(clinicId, { page = 1, limit = 20 } = {}) {
    const [outcomes, total] = await Promise.all([
      outcomeRepository.findByClinicId(clinicId, { page, limit }),
      outcomeRepository.countByClinicId(clinicId),
    ]);
    return toOutcomeListDTO(outcomes, total, page, limit);
  }

  async create({ patientName, painScore, mobilityScore, dateRecorded, clinicId, createdBy }) {
    const outcome = await outcomeRepository.create({
      patientName, painScore, mobilityScore, dateRecorded, clinicId, createdBy,
    });
    return outcome.toObject();
  }
}

export default new OutcomeService();
