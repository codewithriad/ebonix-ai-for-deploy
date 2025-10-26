import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Jun 9", sales: 240 },
  { day: "Jun 10", sales: 320 },
  { day: "Jun 11", sales: 180 },
  { day: "Jun 12", sales: 400 },
  { day: "Jun 13", sales: 280 },
  { day: "Jun 14", sales: 360 },
  { day: "Jun 15", sales: 250 },
  { day: "Jun 16", sales: 390 },
  { day: "Jun 17", sales: 210 },
  { day: "Jun 18", sales: 460 },
  { day: "Jun 19", sales: 330 },
  { day: "Jun 20", sales: 290 },
  { day: "Jun 21", sales: 370 },
  { day: "Jun 22", sales: 310 },
  { day: "Jun 23", sales: 430 },
  { day: "Jun 24", sales: 270 },
  { day: "Jun 25", sales: 490 },
  { day: "Jun 26", sales: 260 },
  { day: "Jun 27", sales: 520 },
  { day: "Jun 28", sales: 300 },
  { day: "Jun 29", sales: 440 },
  { day: "Jun 30", sales: 310 },
  { day: "Jul 1", sales: 480 },
  { day: "Jul 2", sales: 250 },
  { day: "Jul 3", sales: 510 },
  { day: "Jul 4", sales: 270 },
  { day: "Jul 5", sales: 490 },
  { day: "Jul 6", sales: 330 },
  { day: "Jul 7", sales: 550 },
  { day: "Jul 8", sales: 290 },
];

export default function SalesChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="110%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="day" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} width={15} />
          <Tooltip />
          <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
