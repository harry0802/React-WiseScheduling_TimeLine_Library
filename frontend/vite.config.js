import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      src: path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
    sourcemap: false,
    assetsDir: "static",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          antd: ["antd"],
          mui: ["@mui/material", "@mui/icons-material"],
          chakra: ["@chakra-ui/react"],
          charts: ["chart.js", "react-chartjs-2", "echarts", "recharts"],
        },
      },
    },
  },
  assetsInclude: ["**/*.xlsx", "**/*.xls"],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.VITE_EXPOSE_PORT || 80, 10),
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://backend:5000",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
      "/flask-health-check": {
        target: "http://backend:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.VITE_EXPOSE_PORT || 80, 10),
    strictPort: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  define: {
    global: "globalThis",
    "process.env": {
      REACT_APP_API_HOST: JSON.stringify(
        process.env.VITE_API_HOST || process.env.REACT_APP_API_HOST
      ),
      REACT_APP_API_PORT: JSON.stringify(
        process.env.VITE_API_PORT || process.env.REACT_APP_API_PORT
      ),
    },
  },
});
