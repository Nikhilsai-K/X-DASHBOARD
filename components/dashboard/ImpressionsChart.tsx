"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tweet } from "@/lib/types";
import { getImpressionCount } from "@/lib/analytics";

interface ImpressionsChartProps {
  tweets: Tweet[];
}

export function ImpressionsChart({ tweets }: ImpressionsChartProps) {
  const chartData = tweets
    .slice(0, 30)
    .reverse()
    .map((tweet) => ({
      date: new Date(tweet.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      impressions: getImpressionCount(tweet),
    }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Impressions Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: "#8b5cf6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
