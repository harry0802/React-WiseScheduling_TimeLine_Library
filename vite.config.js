import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    //  首頁
    base: "/", // 一律使用根路徑
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