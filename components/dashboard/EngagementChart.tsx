"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Tweet } from "@/lib/types";

interface EngagementChartProps {
  tweets: Tweet[];
}

export function EngagementChart({ tweets }: EngagementChartProps) {
  // Group tweets by date and calculate engagement
  const chartData = tweets
    .slice(0, 30) // Last 30 tweets
    .reverse()
    .map((tweet, index) => ({
      name: `Tweet ${index + 1}`,
      likes: tweet.public_metrics.like_count,
      retweets: tweet.public_metrics.retweet_count,
      replies: tweet.public_metrics.reply_count,
      date: new Date(tweet.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Engagement Over Time (Last 30 Tweets)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend />
          <Bar dataKey="likes" fill="#3b82f6" name="Likes" />
          <Bar dataKey="retweets" fill="#10b981" name="Retweets" />
          <Bar dataKey="replies" fill="#f59e0b" name="Replies" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
