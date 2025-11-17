import { TweetWithEngagement } from "@/lib/types";
import { formatNumber, getImpressionCount } from "@/lib/analytics";
import { Eye, Heart, Repeat2, MessageCircle, TrendingUp } from "lucide-react";

interface TweetCardProps {
  tweet: TweetWithEngagement;
  rank?: number;
}

export function TweetCard({ tweet, rank }: TweetCardProps) {
  const impressions = getImpressionCount(tweet);
  const date = new Date(tweet.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      {rank && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            #{rank}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {date}
          </span>
        </div>
      )}

      <p className="text-gray-900 dark:text-white mb-4 line-clamp-3">
        {tweet.text}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <MetricItem
          icon={Eye}
          label="Impressions"
          value={formatNumber(impressions)}
        />
        <MetricItem
          icon={Heart}
          label="Likes"
          value={formatNumber(tweet.public_metrics.like_count)}
        />
        <MetricItem
          icon={Repeat2}
          label="Retweets"
          value={formatNumber(tweet.public_metrics.retweet_count)}
        />
        <MetricItem
          icon={MessageCircle}
          label="Replies"
          value={formatNumber(tweet.public_metrics.reply_count)}
        />
        <MetricItem
          icon={TrendingUp}
          label="Engagement"
          value={tweet.engagementRate.toFixed(2) + "%"}
        />
      </div>

      <a
        href={`https://twitter.com/user/status/${tweet.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
      >
        View on X →
      </a>
    </div>
  );
}

function MetricItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
