import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DeliveryStatusChart = ({ data }) => {
  const chartData = data.map((item) => {
    return {
      status: item.status
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      count: item.count,
    };
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Overall Statistics</h2>

      <div className="h-100">
        <ResponsiveContainer
          width="100%"
          className="border border-gray-200 dark:border-gray-800 p-3 md:p-8 rounded-2xl h-full"
        >
          <AreaChart
            data={chartData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="statusGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9ae600" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9ae600" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="status" axisLine={{ stroke: "transparent" }} />

            <YAxis allowDecimals={false} axisLine={{ stroke: "transparent" }} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#9ae600"
              strokeWidth={2}
              fill="url(#statusGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeliveryStatusChart;
