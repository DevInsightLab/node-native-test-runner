import { BigQuery } from '@google-cloud/bigquery';

export const createBigQueryClient = () => new BigQuery();

const query = async ({ query, emailId, country }, bigquery = createBigQueryClient()) => {
  const output = [];

  const options = {
    query: query,
    params: {
      emailId,
      country,
    },
  };

  return new Promise((resolve, reject) => {
    bigquery.createQueryStream(options)
      .on('error', reject)
      .on('data', (row) => {
        output.push(row);
      })
      .on('end', () => {
        resolve(output); // Resolve the promise when the stream ends
      });
  });
}

export {
  query,
};
