"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  TooltipProps,
} from "recharts";
import { useEffect, useState } from "react";
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

  // useEffect(() => {
  //   const fetchDailyTransactions = async () => {
  //     try {
  //       setIsLoading(true);
  //       const transactions = await getTransactions();

  //       if (!transactions || !Array.isArray(transactions)) {
  //         setError("No transactions found");
  //         return;
  //       }

  //       const last7Days = [...Array(7)]
  //         .map((_, i) => {
  //           const d = new Date();
  //           d.setDate(d.getDate() - i);
  //           return d.toISOString().split("T")[0];
  //         })
  //         .reverse();

  //       const dailyTotals = last7Days.map((date) => {
  //         const dayTransactions = transactions.filter(
  //           (t: TransactionType) => t.date === date
  //         );

  //         const balance = dayTransactions.reduce(
  //           (sum: number, t: TransactionType) => {
  //             const amount = Number(t.amount);
  //             return t.type === "expense" ? sum - amount : sum + amount;
  //           },
  //           0
  //         );

  //         return {
  //           day: new Date(date).toLocaleDateString("en-US", {
  //             weekday: "short",
  //           }),
  //           amount: balance,
  //         };
  //       });

  //       setChartData(dailyTotals);
  //     } catch (err) {
  //       setError("Failed to fetch transactions");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDailyTransactions();
  // }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!chartData.length) return <div>No data available</div>;

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
        <Bar
          dataKey="amount"
          fill="#80D9FF"
          radius={[10, 10, 2, 2]}
          barSize={25}
        />
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
