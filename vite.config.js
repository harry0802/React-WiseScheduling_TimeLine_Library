import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/React-WiseScheduling_TimeLine_Library/", // 添加這行
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@mui/x-date-pickers",
      "@mui/x-date-pickers/AdapterDateFns",
      "date-fns",
    ],
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
});
