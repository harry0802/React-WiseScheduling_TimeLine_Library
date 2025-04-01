import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    //  首頁
    base: import.meta.env.MODE === "production" ?
        "/React-WiseScheduling_TimeLine_Library/" :
        "/",
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