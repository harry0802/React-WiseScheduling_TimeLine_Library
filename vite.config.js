import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
    const base = "/React-WiseScheduling_TimeLine_Library/";

    return {
        base,
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
    };
});