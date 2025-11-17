import { Tweet, TwitterUser } from "./types";

const TWITTER_API_BASE = "https://api.twitter.com/2";

export async function fetchUserTweets(
  accessToken: string,
  userId: string,
  maxResults: number = 100
): Promise<{ tweets: Tweet[]; user: TwitterUser }> {
  try {
    // Fetch user info
    const userResponse = await fetch(
      `${TWITTER_API_BASE}/users/${userId}?user.fields=profile_image_url,description,public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();

    // Fetch tweets with metrics
    // Note: non_public_metrics and organic_metrics require OAuth 2.0 user context
    const tweetsResponse = await fetch(
      `${TWITTER_API_BASE}/users/${userId}/tweets?` +
        new URLSearchParams({
          max_results: maxResults.toString(),
          "tweet.fields":
            "created_at,public_metrics,non_public_metrics,organic_metrics",
          expansions: "author_id",
        }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!tweetsResponse.ok) {
      const errorData = await tweetsResponse.json();
      throw new Error(
        `Failed to fetch tweets: ${tweetsResponse.statusText} - ${JSON.stringify(errorData)}`
      );
    }

    const tweetsData = await tweetsResponse.json();

    return {
      tweets: tweetsData.data || [],
      user: userData.data,
    };
  } catch (error) {
    console.error("Error fetching Twitter data:", error);
    throw error;
  }
}

export async function fetchUserProfile(
  accessToken: string,
  userId: string
): Promise<TwitterUser> {
  try {
    const response = await fetch(
      `${TWITTER_API_BASE}/users/${userId}?user.fields=profile_image_url,description,public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
