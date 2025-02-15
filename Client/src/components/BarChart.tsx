"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
} from "recharts";
import { getDailyBalances } from "../utils/api";

type dailyTotalsType = {
  day: string;
  amount: number;
};

function BarChartComponent() {
  const [chartData, setChartData] = useState<dailyTotalsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyBalances = async () => {
      try {
        const response = await getDailyBalances();
        if (response && Array.isArray(response)) {
          console.log(response);
          setChartData(response);
        } else {
          setChartData([]);
          setError("No data available");
        }
      } catch (err) {
        setError("Failed to fetch analytics data");
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyBalances();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }
  if (error || chartData.length === 0) {
    return (
      <div className="h-[200px] flex flex-col items-center justify-center">
        <p className="text-my_gray text-center mb-2">No transactions yet</p>
        <p className="text-my_gray text-sm text-center">
          Add your first transaction to see your analytics
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#fff", fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          strokeWidth={2}
          y={0}
          stroke="#7e7e7e"
          strokeOpacity={0.5}
        />
        <Bar dataKey="amount" radius={[10, 10, 2, 2]} barSize={25}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.amount >= 0 ? "#80D9FF" : "#FF8080"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload }: TooltipProps<any, any>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-[15px] shadow-md">
        <p className="text-[#525252] text-sm">{`€${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

export default BarChartComponent;
