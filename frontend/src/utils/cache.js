const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class Cache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  remove(key) {
    this.cache.delete(key);
  }
}

export const cache = new Cache();

// Hook personnalisé pour utiliser le cache
export const useCache = (key, fetchData) => {
  const cachedData = cache.get(key);
  
  if (cachedData) {
    return cachedData;
  }

  const data = fetchData();
  cache.set(key, data);
  return data;
}; 