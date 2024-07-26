// cache.test.js
import assert from 'node:assert';
import { describe, before, it } from 'node:test';
import { createCacheManager } from '../src/cache.js';

describe('CacheManager', () => {
  let cacheManager;

  before(() => {
    cacheManager = createCacheManager();
  });

  const testCases = [
    {
      name: 'get() - should return undefined for a non-existent key',
      operation: 'get',
      key: 'nonexistentKey',
      expectedValue: undefined,
    },
    {
      name: 'set() - should set a value with default TTL',
      operation: 'set',
      key: 'key1',
      value: 'value1',
      ttlSeconds: undefined, // Use default TTL
      expectedResult: true,
      expectedGetValue: 'value1',
    },
    {
      name: 'set() - should set a value with custom TTL',
      operation: 'set',
      key: 'key2',
      value: 'value2',
      ttlSeconds: 60, // Custom TTL
      expectedResult: true,
      expectedGetValue: 'value2',
    },
    {
      name: 'get() - should retrieve a previously set value',
      operation: 'get',
      key: 'key1', // Assuming key1 was set in a previous test case
      expectedValue: 'value1',
    },
    {
      name: 'del() - should delete an existing key',
      operation: 'del',
      key: 'key2', // Assuming key2 was set in a previous test case
      expectedDeleteResult: 1,
      expectedGetValueAfterDelete: undefined,
    },
    {
      name: 'has() - should return true for an existing key',
      operation: 'has',
      key: 'key1', // Assuming key1 is still set
      expectedResult: true,
    },
    {
      name: 'has() - should return false for a deleted key',
      operation: 'has',
      key: 'key2', // Assuming key2 was deleted
      expectedResult: false,
    },
    {
      name: 'clear() - should remove all entries from the cache',
      operation: 'clear',
      key: 'key1', // Assuming key1 is still set
      expectedResult: undefined, // clear() doesn't usually return a value
      expectedGetValueAfterClear: undefined,
    },
    {
      name: 'close() - should close the cache',
      operation: 'close',
      key: 'key2', // Assuming key2 was deleted
    },
  ];

  testCases.forEach(({
    name,
    operation,
    key,
    value,
    ttlSeconds,
    expectedResult,
    expectedValue,
    expectedGetValue,
    expectedDeleteResult,
    expectedGetValueAfterDelete,
    expectedGetValueAfterClear
  }) => {
    it(name, () => {
      let result;

      switch (operation) {
        case 'get':
          result = cacheManager.get(key);
          assert.strictEqual(result, expectedValue, `Expected get('${key}') to return ${expectedValue}, but got ${result}`);
          break;
        case 'set':
          result = cacheManager.set(key, value, ttlSeconds);
          assert.strictEqual(result, expectedResult, `Expected set('${key}', '${value}') to return ${expectedResult}`);
          assert.strictEqual(cacheManager.get(key), expectedGetValue, `Expected get('${key}') to return ${expectedGetValue} after set`);
          break;
        case 'del':
          result = cacheManager.del(key);
          assert.strictEqual(result, expectedDeleteResult, `Expected del('${key}') to return ${expectedDeleteResult}`);
          assert.strictEqual(cacheManager.get(key), expectedGetValueAfterDelete, `Expected get('${key}') to return ${expectedGetValueAfterDelete} after delete`);
          break;
        case 'has':
          result = cacheManager.has(key);
          assert.strictEqual(result, expectedResult, `Expected has('${key}') to return ${expectedResult}`);
          break;
        case 'clear':
          result = cacheManager.clear();
          assert.strictEqual(result, expectedResult, `Expected clear() to return ${expectedResult}`);
          assert.strictEqual(cacheManager.get(key), expectedGetValueAfterClear, `Expected get('${key}') to return ${expectedGetValueAfterClear} after clear`);
          break;
        case 'close':
          cacheManager.close();
          assert.strictEqual(cacheManager.get(key), undefined, `Expected get('${key}') to return undefined after close`);
          break;
        default:
          assert.fail(`Invalid operation: ${operation}`);
      }
    });
  });
});