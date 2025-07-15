import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * @function customBaseQuery
 * @description 自定義 baseQuery，支援 mock 資料和實際 API
 * 統一的查詢基礎，供所有 Manufacturing Live Monitor API 使用
 * @param {Object} args - 查詢參數
 * @returns {Promise} 查詢結果
 */
export const customBaseQuery = async (args) => {
  try {
    console.log("🔄 [ManufacturingLiveMonitor] API 請求開始:", args);
    console.log("🔍 args 內容:", JSON.stringify(args, null, 2));

    // 處理不同的 args 格式
    let url;
    if (typeof args === "string") {
      url = args;
    } else if (args && args.url) {
      url = args.url;
    } else {
      throw new Error(`無效的請求參數: ${JSON.stringify(args)}`);
    }

    console.log("📁 解析後的 URL:", url);

    // 如果是 mock 資料請求
    if (url.startsWith("mock/")) {
      const mockUrl = `/${url}`;
      console.log("📁 請求 URL:", mockUrl);

      const response = await fetch(mockUrl);
      console.log("📊 Response 狀態:", {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        url: response.url,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText} - URL: ${mockUrl}`
        );
      }

      const data = await response.json();
      console.log("✅ 成功取得資料，筆數:", data?.length || "非陣列資料");
      return { data };
    }

    // 實際 API 請求 (未來可以擴展)
    return fetchBaseQuery({
      baseUrl:
        process.env.REACT_APP_MANUFACTURING_API_BASE || "/api/manufacturing/",
    })(args);
  } catch (error) {
    console.error("💥 [ManufacturingLiveMonitor] API 請求失敗:", {
      message: error.message,
      stack: error.stack,
      args: args,
    });

    return {
      error: {
        status: "FETCH_ERROR",
        error: `請求失敗: ${error.message}`,
        originalError: error,
      },
    };
  }
};
