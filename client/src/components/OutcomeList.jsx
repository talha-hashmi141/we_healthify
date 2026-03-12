const scoreBadge = (score, type) => {
  let color;
  if (type === "pain") {
    color = score <= 3 ? "bg-green-50 text-green-700" : score <= 6 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700";
  } else {
    color = score >= 7 ? "bg-green-50 text-green-700" : score >= 4 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700";
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color}`}>
      {score}/10
    </span>
  );
};

function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages, total } = pagination;

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3">
      <p className="text-xs text-gray-500">{total} total records</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-xs text-gray-500">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function OutcomeList({ outcomes, loading, pagination, onPageChange }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
          <p className="text-sm text-gray-400">Loading outcomes...</p>
        </div>
      </div>
    );
  }

  if (!outcomes.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16">
        <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <p className="mt-3 text-sm font-medium text-gray-500">No outcomes recorded yet</p>
        <p className="text-xs text-gray-400">Use the form above to add your first patient outcome</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-900">Patient Outcomes</h2>
        <p className="text-xs text-gray-500">
          {pagination ? `${pagination.total} records` : `${outcomes.length} records`} for your clinic
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Patient</th>
              <th className="px-6 py-3 font-medium">Pain</th>
              <th className="px-6 py-3 font-medium">Mobility</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Recorded By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {outcomes.map((o) => (
              <tr key={o.id} className="transition hover:bg-gray-50/50">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                      {o.patientName?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                    <span className="font-medium text-gray-900">{o.patientName}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5">{scoreBadge(o.painScore, "pain")}</td>
                <td className="px-6 py-3.5">{scoreBadge(o.mobilityScore, "mobility")}</td>
                <td className="px-6 py-3.5 text-gray-500">
                  {new Date(o.dateRecorded).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-6 py-3.5 text-gray-500">{o.createdBy || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
}
