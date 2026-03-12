import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { outcomeSchema } from "../schemas/outcome.schema";
import { outcomeAPI } from "../api/outcome.api";

const initialValues = {
  patientName: "",
  painScore: "",
  mobilityScore: "",
  dateRecorded: new Date().toISOString().split("T")[0],
};

export default function OutcomeForm({ onCreated }) {
  const { values, errors, loading, handleChange, handleSubmit, reset } =
    useForm(initialValues, outcomeSchema);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    await outcomeAPI.create(data);
    reset();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    onCreated?.();
  };

  const inputClass = (name) =>
    `block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm shadow-sm transition ${
      errors[name]
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
    } focus:ring-2 focus:outline-none`;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Record Patient Outcome</h2>
          <p className="text-xs text-gray-500">Enter the patient's scores and date of assessment</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
          <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {errors.general && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errors.general}</div>
        )}
        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Outcome recorded successfully
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Patient Name</label>
            <input name="patientName" value={values.patientName} onChange={handleChange}
              placeholder="e.g. John Smith" className={inputClass("patientName")} />
            {errors.patientName && <p className="mt-1.5 text-xs text-red-500">{errors.patientName}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Date Recorded</label>
            <input name="dateRecorded" type="date" value={values.dateRecorded}
              onChange={handleChange} className={inputClass("dateRecorded")} />
            {errors.dateRecorded && <p className="mt-1.5 text-xs text-red-500">{errors.dateRecorded}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Pain Score <span className="font-normal text-gray-400">(1 = low, 10 = severe)</span>
            </label>
            <input name="painScore" type="number" min="1" max="10" value={values.painScore}
              onChange={handleChange} placeholder="1-10" className={inputClass("painScore")} />
            {errors.painScore && <p className="mt-1.5 text-xs text-red-500">{errors.painScore}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Mobility Score <span className="font-normal text-gray-400">(1 = poor, 10 = excellent)</span>
            </label>
            <input name="mobilityScore" type="number" min="1" max="10" value={values.mobilityScore}
              onChange={handleChange} placeholder="1-10" className={inputClass("mobilityScore")} />
            {errors.mobilityScore && <p className="mt-1.5 text-xs text-red-500">{errors.mobilityScore}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button type="submit" disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
            {loading ? "Saving..." : "Save Outcome"}
          </button>
        </div>
      </form>
    </div>
  );
}
