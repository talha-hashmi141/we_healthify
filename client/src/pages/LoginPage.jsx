import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { loginSchema } from "../schemas/auth.schema";
import { env } from "../config/env";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { values, errors, loading, handleChange, handleSubmit } =
    useForm({ email: "", password: "" }, loginSchema);

  const onSubmit = async (data) => {
    await login(data);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 lg:flex">
        <div className="max-w-md px-8 text-white">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold leading-tight">{env.APP_NAME}</h1>
          <p className="mt-3 text-lg text-indigo-200">
            Multi-tenant patient outcome tracking for modern clinics.
          </p>
          <div className="mt-8 space-y-3 text-sm text-indigo-200">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">1</span>
              <span>Secure tenant-isolated data per clinic</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">2</span>
              <span>Track pain and mobility scores over time</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">3</span>
              <span>Role-based access for your care team</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex w-full items-center justify-center bg-gray-50 px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-indigo-600">{env.APP_NAME}</h1>
            <p className="mt-1 text-sm text-gray-500">Patient outcome tracker</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-500">Sign in to access your clinic dashboard</p>

          {errors.general && (
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
              <input
                name="email" type="email" value={values.email} onChange={handleChange}
                placeholder="you@clinic.com" required autoFocus
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password" type="password" value={values.password} onChange={handleChange}
                placeholder="Enter your password" required
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              />
              {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
              {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            Secure multi-tenant architecture with isolated clinic data
          </p>
        </div>
      </div>
    </div>
  );
}
