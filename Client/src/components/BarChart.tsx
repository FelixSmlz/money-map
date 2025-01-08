"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  TooltipProps,
} from "recharts";

const data = [
  {
    day: "Fri",
    amount: 230,
  },
  {
    day: "Sat",
    amount: 200,
  },
  {
    day: "Sun",
    amount: 90,
  },
  {
    day: "Mon",
    amount: 70,
  },
  {
    day: "Tue",
    amount: 70,
  },
  {
    day: "Wed",
    amount: 90,
  },
  {
    day: "Thu",
    amount: 84,
  },
];

function BarChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data}>
        <XAxis axisLine={false} fontSize={12} tickLine={false} dataKey="day" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="amount" fill="#80D9FF" radius={100} barSize={15} />
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
