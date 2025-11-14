import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendDir: "up" | "down";
};

export default function KpiCard({
  title,
  value,
  icon,
  trend,
  trendDir,
}: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow flex justify-between items-center"
    >
      <div>
        <h4 className="text-sm text-gray-900 dark:text-gray-300">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
        <p
          className={`text-sm ${
            trendDir === "up" ? "text-green-500" : "text-red-500"
          }`}
        >
          {trendDir === "up" ? "↑" : "↓"} {trend}
        </p>
      </div>
      <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
        {icon}
      </div>
    </motion.div>
  );
}
