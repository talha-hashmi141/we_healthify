import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(env.VITE_PORT, 10) || 5173,
      proxy: {
        "/api": {
          target: env.VITE_API_PROXY_TARGET || "http://localhost:5050",
          changeOrigin: true,
        },
      },
    },
  };
});
