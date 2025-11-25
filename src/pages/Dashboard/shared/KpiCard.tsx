import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
  trendDir: "up" | "down";
  color?: "violet" | "blue" | "emerald" | "amber";
};

export default function KpiCard({
  title,
  value,
  icon,
  trend,
  trendDir,
  color = "violet",
}: Props) {
  const getColors = (c: string) => {
    switch (c) {
      case "violet":
        return {
          bg: "bg-violet-50 dark:bg-violet-500/10",
          text: "text-violet-600 dark:text-violet-400",
          border: "border-violet-100 dark:border-violet-500/20",
        };
      case "blue":
        return {
          bg: "bg-blue-50 dark:bg-blue-500/10",
          text: "text-blue-600 dark:text-blue-400",
          border: "border-blue-100 dark:border-blue-500/20",
        };
      case "emerald":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-500/10",
          text: "text-emerald-600 dark:text-emerald-400",
          border: "border-emerald-100 dark:border-emerald-500/20",
        };
      case "amber":
        return {
          bg: "bg-amber-50 dark:bg-amber-500/10",
          text: "text-amber-600 dark:text-amber-400",
          border: "border-amber-100 dark:border-amber-500/20",
        };
      default:
        return {
          bg: "bg-violet-50 dark:bg-violet-500/10",
          text: "text-violet-600 dark:text-violet-400",
          border: "border-violet-100 dark:border-violet-500/20",
        };
    }
  };

  const colors = getColors(color);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 rounded-xl ${colors.bg} ${colors.text} ${colors.border} border`}
        >
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trendDir === "up"
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
          }`}
        >
          <span>{trendDir === "up" ? "+" : "-"}</span>
          <span>{trend}</span>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h4>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </p>
      </div>

      {/* Decorative gradient blob */}
      <div
        className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${colors.bg.replace(
          "bg-",
          "bg-"
        )} blur-2xl`}
      />
    </motion.div>
  );
}
