import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { dashboardData } from "../data/dashboardData";

export default function Dashboard() {
  return (
    <div className="p-5">
      <h1 className="text-xl mb-3">Dashboard 📊</h1>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dashboardData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line dataKey="orders" stroke="#f97316" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}