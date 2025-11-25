import { topCountries } from "@/data/topCountries";

export default function TopCountries() {
  return (
    <div className="w-full">
      <ul className="space-y-5">
        {topCountries.map((country) => (
          <li key={country.code}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  alt={country.name}
                  className="w-6 h-4 rounded-sm shadow"
                />
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {country.name}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {country.users.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: `${country.percent}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
