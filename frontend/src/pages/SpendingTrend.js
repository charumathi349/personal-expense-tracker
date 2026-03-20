import React from "react";
import { Typography, Paper } from "@mui/material";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SpendingTrend({ expenses }) {

  const monthlyTotals = {};

  expenses.forEach((exp) => {
    const month = new Date(exp.date).toLocaleString("default", { month: "short" });

    if (monthlyTotals[month]) {
      monthlyTotals[month] += Number(exp.amount);
    } else {
      monthlyTotals[month] = Number(exp.amount);
    }
  });

  const months = Object.keys(monthlyTotals);
  const amounts = Object.values(monthlyTotals);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Expense Trend",
        data: amounts,
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46,125,50,0.2)",
        tension: 0.4
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>

      <Typography variant="h4" gutterBottom>
        Spending Trend Analysis
      </Typography>

      <Paper
        style={{
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}
      >

        <Typography variant="h6" gutterBottom>
          Expense Growth Over Time
        </Typography>

        <Line data={lineData} />

      </Paper>

    </div>
  );
}

export default SpendingTrend;