// const cache = new Map();

// export const cacheService = {
//   // 設置緩存
//   set(key, data, ttl = 5 * 60 * 1000) {
//     // 預設5分鐘
//     cache.set(key, {
//       data,
//       expiry: Date.now() + ttl,
//     });
//   },

//   // 獲取緩存
//   get(key) {
//     const item = cache.get(key);
//     if (!item) return null;

//     if (Date.now() > item.expiry) {
//       cache.delete(key);
//       return null;
//     }

//     return item.data;
//   },

//   // 清除緩存
//   clear(key) {
//     if (key) {
//       cache.delete(key);
//     } else {
//       cache.clear();
//     }
//   },
// };

class CacheService {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
  }

  set(key, data, ttl = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl,
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(key) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // 新增: 處理並發請求
  async getOrSet(key, fetchFn, ttl = 5 * 60 * 1000) {
    const cached = this.get(key);
    if (cached) return cached;

    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    const promise = fetchFn()
      .then((data) => {
        this.set(key, data, ttl);
        this.pendingRequests.delete(key);
        return data;
      })
      .catch((error) => {
        this.pendingRequests.delete(key);
        throw error;
      });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

export const cacheService = new CacheService();
