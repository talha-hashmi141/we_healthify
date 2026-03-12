export const toOutcomeDTO = (outcome) => ({
  id: outcome._id,
  patientName: outcome.patientName,
  painScore: outcome.painScore,
  mobilityScore: outcome.mobilityScore,
  dateRecorded: outcome.dateRecorded,
  createdBy: outcome.createdBy?.name || null,
});

export const toOutcomeListDTO = (outcomes, total, page, limit) => ({
  outcomes: outcomes.map(toOutcomeDTO),
  pagination: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  },
});
