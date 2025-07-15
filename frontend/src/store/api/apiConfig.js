// Vite 環境下使用代理，生產環境使用環境變數
const isDevelopment = import.meta.env.DEV;

export const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost";
export const API_PORT = process.env.REACT_APP_API_PORT || 5000;

// 開發環境使用 Vite 代理，生產環境使用完整 URL
export const API_URL = isDevelopment ? "" : `${API_HOST}:${API_PORT}`;
export const API_BASE = isDevelopment ? "/api/" : `${API_URL}/api/`;
