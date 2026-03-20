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

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryAnalysis({ expenses }) {

  // Category totals calculate
  const categoryTotals = {};

  expenses.forEach((exp) => {
    if (categoryTotals[exp.category]) {
      categoryTotals[exp.category] += Number(exp.amount);
    } else {
      categoryTotals[exp.category] = Number(exp.amount);
    }
  });

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: amounts,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40"
        ]
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>

      <Typography variant="h4" gutterBottom>
        Category Analysis
      </Typography>

      <Grid container spacing={10}>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
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
              Category Distribution
            </Typography>

            <Pie data={pieData} />
          </Paper>
        </Grid>

        {/* Table */}
        <Grid item xs={12} md={6}>
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
              Category Summary
            </Typography>

            <TableContainer>
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1"><b>Category</b></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1"><b>Total Expense</b></Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>

                  {categories.map((cat, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="subtitle1">{cat}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">₹ {categoryTotals[cat]}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}

                  {categories.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        <Typography variant="subtitle1">
                          No data available
                        </Typography>
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

export default CategoryAnalysis;