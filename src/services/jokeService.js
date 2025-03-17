// 笑話 API 服務
const JOKE_API_URL = "https://official-joke-api.appspot.com/random_joke";

/**
 * 獲取隨機笑話
 * @returns {Promise<Object>} 笑話物件 { setup, punchline, id, type }
 */
export const fetchRandomJoke = async () => {
  try {
    const response = await fetch(JOKE_API_URL);

    if (!response.ok) {
      throw new Error(`API 回應錯誤: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("獲取笑話時出錯:", error);
    throw error;
  }
};
