import React from "react";
import {
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function MonthlyExpenses({ expenses }) {

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

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: amounts,
        backgroundColor: "#1976d2"
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>

      <Typography variant="h4" gutterBottom>
        Monthly Expenses
      </Typography>

      <Grid container spacing={10}>

        {/* Chart */}
        <Grid item xs={12} md={7}>
          <Paper
            style={{
              width:580,
              height:600,
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Monthly Expense Chart
            </Typography>

            <Bar data={barData} height={300}/>
          </Paper>
        </Grid>

        {/* Table */}
        <Grid item xs={12} md={5}>
          <Paper
            style={{
              width:580,
              height:600,
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
          >
            <Typography variant="h6" gutterBottom>
              Monthly Summary
            </Typography>

            <TableContainer>
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1"><b>Month</b></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1"><b>Total Expense</b></Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {months.map((m, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="subtitle1">{m}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">₹ {monthlyTotals[m]}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}

                  {months.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}

                </TableBody>

              </Table>
            </TableContainer>

          </Paper>
        </Grid>

      </Grid>

    </div>
  );
}

export default MonthlyExpenses;