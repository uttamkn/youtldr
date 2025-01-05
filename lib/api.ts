//TODO: The save API function does not work.
import { nhost } from "./nhost";
import { ApiKey, ApiKeyInput, VideoSummary } from "./types";

export async function getUserApiKeys(): Promise<ApiKey[]> {
  const { data, error } = await nhost.graphql.request(`
    query GetUserApiKeys {
      api_keys {
        id
        provider
        api_key
        created_at
        updated_at
      }
    }
  `);

  if (error) throw error;
  return data.api_keys;
}

export async function saveApiKey(input: ApiKeyInput): Promise<ApiKey> {
  const ensureTableExistsQuery = `
    CREATE TABLE IF NOT EXISTS api_keys (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      provider VARCHAR(255) NOT NULL,
      api_key TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
    );
  `;

  const sqlResult = await nhost.graphql.request(`
    mutation {
      run_sql(
        query: """${ensureTableExistsQuery}"""
      ) {
        result_type
        result
      }
    }
  `);

  if (sqlResult.error) {
    console.log(sqlResult);
  }

  const { data, error } = await nhost.graphql.request(
    `
    mutation SaveApiKey($provider: String!, $api_key: String!) {
      insert_api_keys_one(object: {
        provider: $provider,
        api_key: $api_key
      }) {
        id
        provider
        api_key
        created_at
        updated_at
      }
    }
  `,
    input
  );

  if (error) throw error;

  return data.insert_api_keys_one;
}

export async function deleteApiKey(id: string): Promise<void> {
  const { error } = await nhost.graphql.request(
    `
    mutation DeleteApiKey($id: uuid!) {
      delete_api_keys_by_pk(id: $id) {
        id
      }
    }
  `,
    { id }
  );

  if (error) throw error;
}
