import { PieChart } from "@mui/x-charts";
import { desktopOS, valueFormatter } from "./shared/webUsageStats";

const CustomerSatisfactions = () => {
  return (
    <>
      <section className="w-full h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden text-foreground">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Customer Satisfactions
          </h2>
          <button className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            View all
          </button>
        </div>

        {/* main chart */}
        <div className="flex justify-center items-center h-full p-4 text-para">
          <PieChart
            series={[
              {
                data: desktopOS,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                valueFormatter,
              },
            ]}
            height={320}
            width={320}
            sx={{
              "& .MuiChartsLegend-root .MuiChartsLegend-label, & .MuiChartsLegend-label":
                {
                  fill: "#ff0", // Magenta color
                },
            }}
          />
        </div>
      </section>
    </>
  );
};

export default CustomerSatisfactions;
