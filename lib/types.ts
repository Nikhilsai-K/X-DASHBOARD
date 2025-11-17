// NextAuth session type extension
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    userId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
  }
}

// Twitter API Types
export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url?: string;
  description?: string;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
}

export interface TweetMetrics {
  impression_count?: number;
  like_count: number;
  reply_count: number;
  retweet_count: number;
  quote_count: number;
  bookmark_count?: number;
  url_link_clicks?: number;
  user_profile_clicks?: number;
}

export interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    bookmark_count: number;
    impression_count: number;
  };
  non_public_metrics?: {
    impression_count: number;
    url_link_clicks: number;
    user_profile_clicks: number;
  };
  organic_metrics?: {
    impression_count: number;
    like_count: number;
    reply_count: number;
    retweet_count: number;
    url_link_clicks: number;
    user_profile_clicks: number;
  };
}

export interface AnalyticsSummary {
  totalTweets: number;
  totalImpressions: number;
  totalLikes: number;
  totalRetweets: number;
  totalReplies: number;
  avgImpressions: number;
  avgEngagementRate: number;
  topTweet: Tweet | null;
}

export interface TweetWithEngagement extends Tweet {
  engagementRate: number;
  totalEngagement: number;
}
