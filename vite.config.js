import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
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
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        // Vendor chunks - 分離大型第三方庫
                        'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                        'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
                        'vendor-query': ['@tanstack/react-query', '@reduxjs/toolkit', 'react-redux'],
                        'vendor-charts': ['recharts', 'vis-timeline', 'vis-data'],
                        'vendor-date': ['dayjs', 'date-fns'],
                        // ⚠️ Moment.js 獨立打包（建議未來替換成 dayjs）
                        'vendor-moment': ['moment', 'moment-taiwan'],
                    }
                }
            },
            // 提高 chunk 大小警告閾值（暫時），但目標是優化到 500KB 以下
            chunkSizeWarningLimit: 1000,
        },
        server: {
            hmr: true,
            watch: {
                usePolling: true,
            },
        },
    };
});