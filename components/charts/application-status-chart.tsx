"use client";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";


// const data = [
//   {
//     name: "Applied",
//     value: 20,
//   },
//   {
//     name: "Interview",
//     value: 8,
//   },
//   {
//     name: "Offer",
//     value: 2,
//   },
//   {
//     name: "Rejected",
//     value: 6,
//   },
// ];

const COLORS = [
  "#2563eb",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
];

export default function ApplicationStatusChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={110}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}