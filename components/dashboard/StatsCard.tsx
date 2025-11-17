import { LucideIcon } from "lucide-react";
import { formatNumber } from "@/lib/analytics";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  format?: "number" | "percentage" | "raw";
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  format = "number",
}: StatsCardProps) {
  const displayValue =
    format === "number" && typeof value === "number"
      ? formatNumber(value)
      : format === "percentage" && typeof value === "number"
      ? value.toFixed(2) + "%"
      : value;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {displayValue}
        </p>
        {trend && (
          <span className="text-sm text-green-600 dark:text-green-400">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
