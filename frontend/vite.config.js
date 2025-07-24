import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

/**
 * @file Vite 專案設定檔
 * @description 此檔案包含了專案的完整設定，包括插件、路徑別名、建置選項、開發伺服器等。
 * @see https://vitejs.dev/config/
 */

export default defineConfig({
  //! =============== 1. 插件配置 (Plugins) ===============
  //* 此區塊定義了專案所使用的 Vite 插件。
  plugins: [
    // 啟用 React 支援，包含 HMR (熱模組替換) 和 JSX 轉換。
    react(),
    // 允許將 SVG 檔案作為 React 組件匯入。
    svgr({
      svgrOptions: {
        // 'icon: true' 會將 SVG 的尺寸設定為 1em，方便作為圖示使用。
        icon: true,
      },
    }),
  ],

  //! =============== 2. 路徑解析 (Resolve) ===============
  //* 設定模組匯入的路徑別名，簡化引用路徑，提升開發效率。
  resolve: {
    alias: {
      // 將 '@' 和 'src' 都指向 './src' 目錄。
      // 範例：import Component from '@/components/MyComponent';
      "@": path.resolve(__dirname, "./src"),
      src: path.resolve(__dirname, "./src"),
    },
  },

  //! =============== 3. 生產環境建置 (Build) ===============
  //* 此區塊的設定會影響 `vite build` 命令的輸出結果。
  build: {
    // 輸出目錄的名稱。
    outDir: "build",
    // 禁用 Source Map，可加速建置並減小檔案大小，但不利於生產環境除錯。
    sourcemap: false,
    // 靜態資源 (如 CSS, JS, 圖片) 的輸出目錄。
    assetsDir: "static",
    // 警告單一 chunk 大小超過此限制 (單位 KB)，有助於發現過大的檔案。
    chunkSizeWarningLimit: 1000,
    // Rollup 的進階設定，主要用於程式碼分割 (Code Splitting)。
    rollupOptions: {
      output: {
        /**
         * 🧠 手動程式碼分割 (Manual Chunks)
         * @description 將大型依賴庫分割成獨立的 chunk，實現更佳的快取策略和按需載入。
         * 當使用者首次訪問時，瀏覽器可以並行下載這些 chunk，並在後續訪問中快取它們。
         */
        manualChunks: {
          // 核心依賴：React 相關庫。
          vendor: ["react", "react-dom"],
          // UI 函式庫：將不同的 UI 函式庫分開打包。
          antd: ["antd"],
          mui: ["@mui/material", "@mui/icons-material"],
          chakra: ["@chakra-ui/react"],
          // 圖表庫：將多個圖表庫打包在一起，因為它們通常在同個頁面使用。
          charts: ["chart.js", "react-chartjs-2", "echarts", "recharts"],
        },
      },
    },
  },

  //! =============== 4. 靜態資源包含 ===============
  //* 讓 Vite 能識別並處理特定類型的檔案作為靜態資源。
  assetsInclude: ["**/*.xlsx", "**/*.xls"],

  //! =============== 5. 開發伺服器 (Server) ===============
  //* `vite dev` 命令的相關設定。
  server: {
    // 監聽所有網路介面，允許同網段的其他裝置訪問。
    host: "0.0.0.0",
    // 伺服器端口，從環境變數讀取，預設為 80。
    port: parseInt(process.env.VITE_EXPOSE_PORT || "80", 10),
    // 如果端口已被佔用，Vite 將不會自動嘗試下一個可用端口。
    strictPort: true,
    /**
     * 🧠 代理伺服器 (Proxy)
     * @description 解決開發環境下的跨域請求問題 (CORS)。
     * 所有符合規則的請求都會被 Vite 開發伺服器轉發到指定的後端目標。
     */
    proxy: {
      // 將所有 /api 開頭的請求轉發到後端服務。
      "/api": {
        target: "http://backend:5000", // 後端服務地址 (通常是 Docker 容器名稱)
        changeOrigin: true, // 修改請求頭中的 Origin 欄位，使其與目標主機一致。
        secure: false, // 不驗證 SSL 憑證。
        ws: true, // 啟用 WebSocket 代理。
        //? 配置代理事件監聽，用於除錯。
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("代理錯誤", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("發送請求到目標:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log("從目標收到回應:", proxyRes.statusCode, req.url);
          });
        },
      },
      // 健康檢查的代理規則。
      "/flask-health-check": {
        target: "http://backend:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  //! =============== 6. 預覽伺服器 (Preview) ===============
  //* `vite preview` 命令的相關設定，用於在本地預覽生產建置後的結果。
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.VITE_EXPOSE_PORT || "80", 10),
    strictPort: true,
  },

  //! =============== 7. CSS 預處理器 ===============
  css: {
    preprocessorOptions: {
      scss: {
        // 使用現代的 Sass 編譯器 API。
        api: "modern-compiler",
      },
    },
  },

  //! =============== 8. 全域變數定義 (Define) ===============
  //* 在建置時替換程式碼中的全域變數，常用於注入環境變數。
  define: {
    // 為了相容某些舊版套件，將 global 指向 globalThis。
    global: "globalThis",
    // 💡 將環境變數注入到前端程式碼中，讓前端可以存取。
    // 這會將 `process.env.REACT_APP_API_HOST` 替換為實際的變數值。
    "process.env": {
      REACT_APP_API_HOST: JSON.stringify(
        process.env.VITE_API_HOST || process.env.REACT_APP_API_HOST
      ),
      REACT_APP_API_PORT: JSON.stringify(
        process.env.VITE_API_PORT || process.env.REACT_APP_API_PORT
      ),
      // 💡 布林值環境變數 - 不需要 JSON.stringify()
      REACT_APP_LY_ERP_ON:
        process.env.VITE_LY_ERP_ON || process.env.REACT_APP_LY_ERP_ON,

      // 📝 未來新增環境變數的模板：
      // 字串類型 (需要 JSON.stringify)
      // REACT_APP_NEW_STRING_VAR: JSON.stringify(
      //   process.env.VITE_NEW_STRING_VAR || process.env.REACT_APP_NEW_STRING_VAR
      // ),
      //
      // 布林值類型 (不需要 JSON.stringify)
      // REACT_APP_NEW_BOOLEAN_VAR:
      //   process.env.VITE_NEW_BOOLEAN_VAR || process.env.REACT_APP_NEW_BOOLEAN_VAR,
      //
      // 數字類型 (需要轉換)
      // REACT_APP_NEW_NUMBER_VAR: JSON.stringify(
      //   parseInt(process.env.VITE_NEW_NUMBER_VAR || process.env.REACT_APP_NEW_NUMBER_VAR || "0")
      // ),
    },
  },
});
