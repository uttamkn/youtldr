import { nhost } from "./nhost";
import { VideoSummary, UserHistory } from "./types";

const extractYoutubeId = (url: string) => {
  // Regex pattern that matches both youtu.be and youtube.com URLs
  const pattern =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
};

export async function getUserHistory(): Promise<UserHistory[]> {
  const userId = nhost.auth.getUser()?.id;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const { data, error } = await nhost.graphql.request(`
    query GetUserHistory {
      user_history(where: { userId: { _eq: "${userId}" } }) {
        id
        youtubeUrl
        summary
        title
        description
      }
    }
  `);

  if (error) throw error;
  return data.user_history;
}

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
      user_history(where: { userId: { _eq: "${userId}" }, videoId: { _eq: "${extractYoutubeId(
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
  mutation InsertUserHistory($userId: uuid!, $youtubeUrl: String!, $videoId: String!, $summary: String!, $title: String!, $description: String!) {
    insert_user_history(objects: {
      userId: $userId,
      youtubeUrl: $youtubeUrl,
      videoId: $videoId,
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
      youtubeUrl: summary.youtubeUrl,
      videoId: summary.id,
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
