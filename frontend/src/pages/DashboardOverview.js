import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function DashboardOverview({ expenses }) {
  // Step 4: Dynamic calculations
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalTransactions = expenses.length;
  const totalIncome = 20000; // Example, can also be dynamic
  const totalBalance = totalIncome - totalExpenses;

  // Prepare category-wise data for Pie chart
  const categoryMap = {};
  expenses.forEach((exp) => {
    if (categoryMap[exp.category]) categoryMap[exp.category] += exp.amount;
    else categoryMap[exp.category] = exp.amount;
  });

  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Category Expenses",
        data: Object.values(categoryMap),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Monthly data aggregation for Bar chart
const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const monthlyData = new Array(12).fill(0);
  expenses.forEach((exp) => {
    const monthIndex = new Date(exp.date).getMonth(); // 0 based index
    monthlyData[monthIndex] += exp.amount;
  });

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyData,
        backgroundColor: "rgba(33, 150, 243, 0.6)",
      },
    ],
  };
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top"
    }
  },
  scales: {
    x: {
      ticks: {
        autoSkip: false
      }
    },
    y: {
      beginAtZero: true
    }
  }
};
  return (
    <div style={{ padding: "20px",width:"100%" }}>
      <Typography variant="h3" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Dynamic Summary Cards */}
      <Grid container spacing={10} marginBottom={10}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            style={{
              width:300,
              height:200,
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4">Total Expenses</Typography>
            <Typography variant="h4" color="secondary">
              ₹ {totalExpenses}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            style={{
              width:300,
              height:200,
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4">Transactions</Typography>
            <Typography variant="h4" color="primary">
              {totalTransactions}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Paper
            style={{
              width:300,
              height:200,
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4">Total Balance</Typography>
            <Typography variant="h4" color="success.main">
              ₹ {totalBalance}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={10}marginBottom={10}>
        <Grid item xs={12} md={6}>
          <Paper
            style={{
              width:400,
              height:300,
              padding: 40,
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Monthly Expenses
            </Typography>
            <Bar data={barData} height={300} options={options} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            style={{
              width:400,
              height:300,
              padding: 40,
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Category Analysis
            </Typography>
            <Pie data={pieData} height={300} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardOverview;