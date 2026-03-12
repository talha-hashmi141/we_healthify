import axios from "axios";
import { env } from "../config/env";

const api = axios.create({
  baseURL: env.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(env.TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    const errors = error.response?.data?.errors || [];
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem(env.TOKEN_KEY);
      window.location.href = "/";
    }
    return Promise.reject({ message, errors, status: error.response?.status });
  }
);

export default api;
