import { useState, useEffect, useCallback } from "react";
import { outcomeAPI } from "../api/outcome.api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import OutcomeForm from "../components/OutcomeForm";
import OutcomeList from "../components/OutcomeList";

export default function DashboardPage() {
  const { user } = useAuth();
  const [outcomes, setOutcomes] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchOutcomes = useCallback(async (p = page) => {
    setLoading(true);
    try {
      const res = await outcomeAPI.list(p);
      setOutcomes(res.data.outcomes);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch outcomes:", err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await outcomeAPI.stats();
      setStats(res.data.stats);
    } catch (err) {
      console.error("Failed to fetch stats:", err.message);
    }
  }, []);

  useEffect(() => { fetchOutcomes(page); }, [page, fetchOutcomes]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleCreated = () => {
    fetchOutcomes(1);
    fetchStats();
  };

  const clinicName = user?.clinic || user?.clinicId?.name || "Your Clinic";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage patient outcomes for <span className="font-medium text-indigo-600">{clinicName}</span>
          </p>
        </div>

        <StatsCards stats={stats} />
        <OutcomeForm onCreated={handleCreated} />
        <OutcomeList
          outcomes={outcomes}
          loading={loading}
          pagination={pagination}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}
