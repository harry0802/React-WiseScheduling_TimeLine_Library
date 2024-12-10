const cache = new Map();

export const cacheService = {
  // 設置緩存
  set(key, data, ttl = 5 * 60 * 1000) {
    // 預設5分鐘
    cache.set(key, {
      data,
      expiry: Date.now() + ttl,
    });
  },

  // 獲取緩存
  get(key) {
    const item = cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      cache.delete(key);
      return null;
    }

    return item.data;
  },

  // 清除緩存
  clear(key) {
    if (key) {
      cache.delete(key);
    } else {
      cache.clear();
    }
  },
};
