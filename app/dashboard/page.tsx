"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Eye,
  Heart,
  Repeat2,
  MessageCircle,
  TrendingUp,
  LogOut,
  Loader2,
} from "lucide-react";
import { Tweet, TwitterUser } from "@/lib/types";
import {
  calculateAnalyticsSummary,
  getTopTweetsByImpressions,
  getTopTweetsByEngagement,
} from "@/lib/analytics";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TweetCard } from "@/components/dashboard/TweetCard";
import { EngagementChart } from "@/components/dashboard/EngagementChart";
import { ImpressionsChart } from "@/components/dashboard/ImpressionsChart";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [user, setUser] = useState<TwitterUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const [tweetsRes, userRes] = await Promise.all([
        fetch("/api/twitter/tweets?max_results=100"),
        fetch("/api/twitter/user"),
      ]);

      if (!tweetsRes.ok || !userRes.ok) {
        const tweetsError = !tweetsRes.ok ? await tweetsRes.json() : null;
        const userError = !userRes.ok ? await userRes.json() : null;
        const errorMsg = tweetsError?.error || userError?.error || "Failed to fetch data from X API";
        const errorDetails = tweetsError?.details || userError?.details || "";
        console.error("API Error:", { tweetsError, userError });
        throw new Error(`${errorMsg}${errorDetails ? ` - ${errorDetails}` : ""}`);
      }

      const tweetsData = await tweetsRes.json();
      const userData = await userRes.json();

      setTweets(tweetsData.tweets || []);
      setUser(userData);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading your analytics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => fetchData()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const analytics = calculateAnalyticsSummary(tweets);
  const topByImpressions = getTopTweetsByImpressions(tweets, 5);
  const topByEngagement = getTopTweetsByEngagement(tweets, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {user?.profile_image_url && (
              <img
                src={user.profile_image_url}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user?.name || "Your Dashboard"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                @{user?.username}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatsCard
            title="Total Tweets"
            value={analytics.totalTweets}
            icon={MessageCircle}
          />
          <StatsCard
            title="Total Impressions"
            value={analytics.totalImpressions}
            icon={Eye}
          />
          <StatsCard
            title="Total Likes"
            value={analytics.totalLikes}
            icon={Heart}
          />
          <StatsCard
            title="Total Retweets"
            value={analytics.totalRetweets}
            icon={Repeat2}
          />
          <StatsCard
            title="Avg Engagement"
            value={analytics.avgEngagementRate}
            icon={TrendingUp}
            format="percentage"
          />
        </div>

        {/* Charts */}
        {tweets.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ImpressionsChart tweets={tweets} />
            <EngagementChart tweets={tweets} />
          </div>
        )}

        {/* Top Tweets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top by Impressions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Top Posts by Impressions
            </h2>
            <div className="space-y-4">
              {topByImpressions.map((tweet, index) => (
                <TweetCard key={tweet.id} tweet={tweet} rank={index + 1} />
              ))}
            </div>
          </div>

          {/* Top by Engagement */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Top Posts by Engagement Rate
            </h2>
            <div className="space-y-4">
              {topByEngagement.map((tweet, index) => (
                <TweetCard key={tweet.id} tweet={tweet} rank={index + 1} />
              ))}
            </div>
          </div>
        </div>

        {/* No tweets message */}
        {tweets.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tweets found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start posting on X to see your analytics here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
