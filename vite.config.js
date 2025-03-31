import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    //  首頁
    base: "/React-WiseScheduling_TimeLine_Library/", // 設置為GitHub Pages倉庫路徑
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