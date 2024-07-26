import NodeCache from 'node-cache';

const DEFAULT_CACHE_OPTIONS = {
  stdTTL: 3600, // Default TTL: 1 hour
};

const createCacheManager = (options = {}) => {
  const cache = new NodeCache({ ...DEFAULT_CACHE_OPTIONS, ...options });

  return {
    get: (key) => cache.get(key),
    set: (key, value, ttlSeconds) => cache.set(key, value, ttlSeconds),
    del: (key) => cache.del(key),
    has: (key) => cache.has(key), // Add a "has" method
    clear: () => cache.flushAll(), // Clear all entries
    close: () => cache.close(),
  };
};

const defaultCacheManager = createCacheManager();

export { createCacheManager, defaultCacheManager };
