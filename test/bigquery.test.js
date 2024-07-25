import assert from 'node:assert';
import { describe, it, beforeEach, after, mock } from 'node:test';
import { query } from '../src/bigquery.js';

describe('BigQuery Module', () => {
  let mockBigQuery;

  beforeEach(() => {
    mockBigQuery = {
      createQueryStream: mock.fn(() => ({
        on: mock.fn(function (event, callback) {
          if (event === 'error' && mockBigQuery.error) {
            // @ts-ignore
            callback(mockBigQuery.error);
          } else if (event === 'data' && mockBigQuery.data) {
            mockBigQuery.data.forEach(callback); // Stream sends individual objects
          } else if (event === 'end') {
            // @ts-ignore
            callback();
          }
          return this; // Return 'this' for chaining

        }),
      })
      ),
    };
  });

  after(() => {
    mock.restoreAll();
  });

  const tests = {
    success: [
      {
        name: 'should execute a query and return results',
        input: {
          query: 'SELECT * FROM dataset.table WHERE emailid = @emailid AND country = @country',
          emailid: 'chetan@example.com',
          country: 'IN'
        },
        mockData: [{ id: 1, name: 'Chetan' }],
        expectedOutput: [{ id: 1, name: 'Chetan' }],
        expectedError: null,
      },
      {
        name: 'should handle empty result set',
        input: {
          query: 'SELECT * FROM `project.dataset.table` WHERE 1=2', // Always false condition
          emailid: 'random@example.com',
          country: 'CN',
        },
        mockData: [],
        expectedOutput: [],
        expectedError: null,
      },
    ],
    error: [
      {
        name: 'should reject the promise on BigQuery error',
        input: {
          query: 'INVALID SQL QUERY',
          emailId: 'ch@example.com',
          country: 'AT',
        },
        mockData: null,
        expectedOutput: null,
        expectedError: new Error('Simulated BigQuery Error'),
      },
    ],
  };

  tests.success.forEach((t) => {
    it(t.name, async () => {
      mockBigQuery.data = t.mockData;

      const result = await query(t.input, mockBigQuery);
      assert.deepStrictEqual(result, t.expectedOutput);
    });
  });

  tests.error.forEach((t) => {
    it(t.name, async () => {
      mockBigQuery.error = t.expectedError;

      await assert.rejects(async () => {
        await query(t.input, mockBigQuery);
      }, {
        message: t.expectedError.message,
      });
    });
  });
});
