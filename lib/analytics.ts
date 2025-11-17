import { Tweet, TweetWithEngagement, AnalyticsSummary } from "./types";

export function calculateEngagementRate(tweet: Tweet): number {
  const impressions =
    tweet.non_public_metrics?.impression_count ||
    tweet.organic_metrics?.impression_count ||
    tweet.public_metrics.impression_count ||
    0;

  if (impressions === 0) return 0;

  const totalEngagement =
    tweet.public_metrics.like_count +
    tweet.public_metrics.retweet_count +
    tweet.public_metrics.reply_count +
    tweet.public_metrics.quote_count;

  return (totalEngagement / impressions) * 100;
}

export function getTotalEngagement(tweet: Tweet): number {
  return (
    tweet.public_metrics.like_count +
    tweet.public_metrics.retweet_count +
    tweet.public_metrics.reply_count +
    tweet.public_metrics.quote_count
  );
}

export function getImpressionCount(tweet: Tweet): number {
  return (
    tweet.non_public_metrics?.impression_count ||
    tweet.organic_metrics?.impression_count ||
    tweet.public_metrics.impression_count ||
    0
  );
}

export function addEngagementMetrics(tweets: Tweet[]): TweetWithEngagement[] {
  return tweets.map((tweet) => ({
    ...tweet,
    engagementRate: calculateEngagementRate(tweet),
    totalEngagement: getTotalEngagement(tweet),
  }));
}

export function calculateAnalyticsSummary(tweets: Tweet[]): AnalyticsSummary {
  if (tweets.length === 0) {
    return {
      totalTweets: 0,
      totalImpressions: 0,
      totalLikes: 0,
      totalRetweets: 0,
      totalReplies: 0,
      avgImpressions: 0,
      avgEngagementRate: 0,
      topTweet: null,
    };
  }

  const totalImpressions = tweets.reduce(
    (sum, tweet) => sum + getImpressionCount(tweet),
    0
  );
  const totalLikes = tweets.reduce(
    (sum, tweet) => sum + tweet.public_metrics.like_count,
    0
  );
  const totalRetweets = tweets.reduce(
    (sum, tweet) => sum + tweet.public_metrics.retweet_count,
    0
  );
  const totalReplies = tweets.reduce(
    (sum, tweet) => sum + tweet.public_metrics.reply_count,
    0
  );

  const tweetsWithEngagement = addEngagementMetrics(tweets);
  const avgEngagementRate =
    tweetsWithEngagement.reduce((sum, tweet) => sum + tweet.engagementRate, 0) /
    tweets.length;

  const topTweet = [...tweetsWithEngagement].sort(
    (a, b) => getImpressionCount(b) - getImpressionCount(a)
  )[0];

  return {
    totalTweets: tweets.length,
    totalImpressions,
    totalLikes,
    totalRetweets,
    totalReplies,
    avgImpressions: totalImpressions / tweets.length,
    avgEngagementRate,
    topTweet,
  };
}

export function getTopTweetsByImpressions(
  tweets: Tweet[],
  limit: number = 5
): TweetWithEngagement[] {
  const tweetsWithMetrics = addEngagementMetrics(tweets);
  return tweetsWithMetrics
    .sort((a, b) => getImpressionCount(b) - getImpressionCount(a))
    .slice(0, limit);
}

export function getTopTweetsByEngagement(
  tweets: Tweet[],
  limit: number = 5
): TweetWithEngagement[] {
  const tweetsWithMetrics = addEngagementMetrics(tweets);
  return tweetsWithMetrics
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, limit);
}

export function getTweetsByDateRange(
  tweets: Tweet[],
  days: number = 30
): Tweet[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return tweets.filter((tweet) => new Date(tweet.created_at) >= cutoffDate);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatPercentage(num: number): string {
  return num.toFixed(2) + "%";
}
