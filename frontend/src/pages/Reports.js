import React from "react";
import { Typography, Paper, Grid, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


function Reports() {
    const [expenses, setExpenses] = useState([]);
    // Dummy data (later backend connect pannuvom)
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    const totalTransactions = expenses.length;

    const foodExpense = expenses
        .filter((e) => e.category === "Food")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const transportExpense = expenses
        .filter((e) => e.category === "Transport")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const shoppingExpense = expenses
        .filter((e) => e.category === "Shopping")
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const handleExport = () => {

        const csvRows = [
            ["Title", "Amount", "Category", "Payment", "Date"]
        ];

        expenses.forEach(e => {
            csvRows.push([
                e.title,
                e.amount,
                e.category,
                e.paymentMethod,
                e.date
            ]);
        });

        const csvContent = csvRows.map(r => r.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "expense-report.csv";
        a.click();
    };
    useEffect(() => {
        axios
            .get("http://localhost:8081/api/expenses")
            .then((res) => setExpenses(res.data))
            .catch((err) => console.error(err));
    }, []);
    return ( <
        div style = {
            { padding: "20px" } } >
        <
        Typography variant = "h4"
        gutterBottom >
        Expense Reports <
        /Typography>

        <
        Grid container spacing = { 10 } >

        { /* Total Expenses */ } <
        Grid item xs = { 12 }
        md = { 4 } >
        <
        Paper style = {
            {
                padding: 20,
                borderRadius: 12,
                width: 300,
                height: 200,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }
        } >
        <
        Typography variant = "h4" > Total Expenses < /Typography> <
        Typography variant = "h4"
        color = "primary" > ₹{ totalExpenses } < /Typography> <
        /Paper> <
        /Grid>

        { /* Transactions */ } <
        Grid item xs = { 12 }
        md = { 4 } >
        <
        Paper style = {
            {
                padding: 20,
                width: 300,
                height: 200,
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }
        } >
        <
        Typography variant = "h4" > Transactions < /Typography> <
        Typography variant = "h4"
        color = "secondary" > { totalTransactions } < /Typography> <
        /Paper> <
        /Grid>

        { /* Export */ } <
        Grid item xs = { 12 }
        md = { 4 } >
        <
        Paper style = {
            {
                padding: 20,
                width: 300,
                height: 200,
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                textAlign: "center"
            }
        } >
        <
        Typography variant = "h4"
        gutterBottom > Export Report < /Typography> <
        Button variant = "contained"
        color = "primary"
        onClick = { handleExport } >
        Download Report <
        /Button> <
        /Paper> <
        /Grid>

        <
        /Grid>

        { /* Category Breakdown */ } <
        Paper style = {
            { marginTop: 30, padding: 25, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" } } >
        <
        Typography variant = "h4"
        gutterBottom >
        Category Breakdown <
        /Typography>

        <
        Grid container spacing = { 3 } >

        <
        Grid item xs = { 12 }
        md = { 4 } >
        <
        Typography variant = "subtitle1" > Food < /Typography> <
        Typography variant = "h6"
        color = "primary" > ₹{ foodExpense } < /Typography> <
        /Grid>

        <
        Grid item xs = { 12 }
        md = { 4 } >
        <
        Typography variant = "subtitle1" > Transport < /Typography> <
        Typography variant = "h6"
        color = "primary" > ₹{ transportExpense } < /Typography> <
        /Grid>

        <
        Grid item xs = { 12 }
        md = { 4 } >
        <
        Typography variant = "subtitle1" > Shopping < /Typography> <
        Typography variant = "h6"
        color = "primary" > ₹{ shoppingExpense } < /Typography> <
        /Grid>

        <
        /Grid> <
        /Paper>

        <
        /div>
    );
}

export default Reports;