import { nhost } from "./nhost";
import { ApiKey, ApiKeyInput, VideoSummary } from "./types";

const extractYoutubeId = (url: string) => {
  // Regex pattern that matches both youtu.be and youtube.com URLs
  const pattern =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
};

export async function getSummary(url: string): Promise<VideoSummary> {
  if (!url) {
    throw new Error("URL is required");
  }

  const userId = nhost.auth.getUser()?.id;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  // Check if the summary exists in the database
  const QUERY = `
    query GetUserHistory {
      user_history(where: { userId: { _eq: "${userId}" }, youtubeUrl: { _eq: "${extractYoutubeId(
    url
  )}" } }) {
        id
        summary
        youtubeUrl
      }
    }
  `;

  try {
    console.log("Fetching user history...");
    const { data, error } = await nhost.graphql.request(QUERY);

    if (error) {
      console.error("Error fetching user history:", error);
      throw error;
    }

    // If a cached summary exists, return it
    if (data?.user_history.length > 0) {
      return data.user_history[0];
    }
    console.log("No cached summary found.");

    // Otherwise, fetch a new summary from the custom action
    const ACTION = `
      mutation ProcessYoutube {
        getSummary(youtube_url: "${url}") {
          id
          title
          youtubeUrl
          description
          summary
          error
        }
      }
    `;

    const { data: actionData, error: actionError } =
      await nhost.graphql.request(ACTION);

    if (actionError) {
      console.error("Error calling custom action:", actionError);
      throw actionError;
    }

    if (actionData?.getSummary.error) {
      throw new Error(actionData.getSummary.error);
    }

    const summary: VideoSummary = actionData.getSummary;

    // Save the new summary in the database
    const INSERT_MUTATION = `
  mutation InsertUserHistory($userId: uuid!, $youtubeUrl: String!, $summary: String!, $title: String!, $description: String!) {
    insert_user_history(objects: {
      userId: $userId,
      youtubeUrl: $youtubeUrl,
      summary: $summary,
      title: $title,
      description: $description
    }) {
      returning {
        id
        summary
      }
    }
  }
`;

    const variables = {
      userId: userId,
      youtubeUrl: summary.id,
      summary: summary.summary,
      title: summary.title,
      description: summary.description,
    };

    const { error: insertError } = await nhost.graphql.request(
      INSERT_MUTATION,
      variables
    );

    if (insertError) {
      console.error("Error saving summary to user history:", insertError);
      throw insertError;
    }

    return summary;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

//TODO: Save API functionality yet to be implemented
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
