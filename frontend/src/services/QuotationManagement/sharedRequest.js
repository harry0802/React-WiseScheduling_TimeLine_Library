import { cacheService } from "../cacheService";

export const createSharedRequest = (cacheKey, fetchFn, ttl = 300000) => {
  let sharedPromise = null;
  let lastFetchTime = 0;

  return async (forceRefresh = false) => {
    const now = Date.now();
    const cached = cacheService.get(cacheKey);

    if (cached && !forceRefresh) {
      return cached;
    }

    if (sharedPromise && now - lastFetchTime < 5000) {
      return sharedPromise;
    }

    lastFetchTime = now;
    sharedPromise = fetchFn()
      .then((result) => {
        cacheService.set(cacheKey, result, ttl);
        return result;
      })
      .finally(() => {
        setTimeout(() => {
          sharedPromise = null;
        }, 5000);
      });

    return sharedPromise;
  };
};
