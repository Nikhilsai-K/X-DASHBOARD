"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarChart3, TrendingUp, Eye, Heart } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            X Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Unlock deep insights from your X (Twitter) posts
          </p>
          <button
            onClick={() => signIn("twitter")}
            disabled={status === "loading"}
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Loading..." : "Sign in with X"}
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Eye className="w-8 h-8" />}
            title="Impressions"
            description="Track how many people saw your posts"
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8" />}
            title="Engagement"
            description="Analyze likes, retweets, and replies"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Trends"
            description="Discover your best performing content"
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Analytics"
            description="Beautiful charts and insights"
          />
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <ol className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="font-bold text-blue-600 dark:text-blue-400 mr-3">1.</span>
              <span>Sign in with your X account using OAuth 2.0</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 dark:text-blue-400 mr-3">2.</span>
              <span>We fetch your recent posts with analytics data</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 dark:text-blue-400 mr-3">3.</span>
              <span>View beautiful insights and trends in your dashboard</span>
            </li>
          </ol>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>100% Free & Private:</strong> Your data stays with you. We only access what you authorize through X&apos;s official API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
      <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}
