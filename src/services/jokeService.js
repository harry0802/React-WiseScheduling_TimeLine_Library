// 備用笑話，當 API 調用失敗時使用
export const FALLBACK_JOKES = [
  {
    id: 1,
    setup: "為什麼 JavaScript 的程序員不喇優？",
    punchline: "因為他們不能處理 Promise 不確定的狀態。",
    type: "programming"
  },
  {
    id: 2,
    setup: "為什麼 React 組件該吃更多水果？",
    punchline: "因為它們很容易變得不空間性。",
    type: "programming"
  },
  {
    id: 3,
    setup: "進入酒吧的網路協議有 TCP 與 UDP 兩種，其中 TCP 聲明...",
    punchline: "我想喝一杯酒。UDP 聲明：酒來了。",
    type: "programming"
  }
];

/**
 * 設定請求逆時
 * @param {number} timeout - 逆時毫秒數
 * @returns {Promise<Response>} 帶有逆時的 fetch 請求
 */
const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// 笑話 API 服務
const JOKE_API_URL = "https://official-joke-api.appspot.com/random_joke";

/**
 * 獲取隨機笑話
 * @returns {Promise<Object>} 笑話物件 { setup, punchline, id, type }
 */
export const fetchRandomJoke = async () => {
  try {
    const response = await fetchWithTimeout(JOKE_API_URL, 5000);

    if (!response.ok) {
      throw new Error(`API 回應錯誤: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("獲取笑話時出錯:", error);
    // 當 API 調用失敗時，使用備用笑話
    const randomIndex = Math.floor(Math.random() * FALLBACK_JOKES.length);
    return FALLBACK_JOKES[randomIndex];
  }
};
