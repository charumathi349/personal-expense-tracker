import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, Divider } from "@mui/material";
import axios from "axios";

function ExpenseDetails() {

    const [expenses, setExpenses] = useState([]);

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
        Expense Details <
        /Typography>

        {
            expenses.map((expense) => (

                <
                Paper key = { expense.id }
                style = {
                    {
                        padding: "25px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        marginBottom: "20px"
                    }
                } >
                <
                Grid container spacing = { 3 } >

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Title < /b></Typography >
                <
                Typography variant = "h6" > { expense.title } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Amount < /b></Typography >
                <
                Typography variant = "h6"
                color = "primary" > ₹{ expense.amount } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Category < /b></Typography >
                <
                Typography variant = "h6" > { expense.category } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Payment Method < /b></Typography >
                <
                Typography variant = "h6" > { expense.paymentMethod } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Date < /b></Typography >
                <
                Typography variant = "h6" > { expense.date } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Location < /b></Typography >
                <
                Typography variant = "h6" > { expense.location } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Tax < /b></Typography >
                <
                Typography variant = "h6" > ₹{ expense.tax } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Priority < /b></Typography >
                <
                Typography variant = "h6" > { expense.priority } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 }
                md = { 6 } >
                <
                Typography variant = "h6" > < b > Recurring < /b></Typography >
                <
                Typography variant = "h6" > { expense.recurring ? "Yes" : "No" } < /Typography> <
                /Grid>

                <
                Grid item xs = { 12 } >
                <
                Divider style = {
                    { margin: "15px 0" } }
                /> <
                Typography variant = "h6" > < b > Notes < /b></Typography >
                <
                Typography > { expense.notes } < /Typography> <
                /Grid>

                <
                /Grid> <
                /Paper>

            ))
        }

        <
        /div>
    );
}

export default ExpenseDetails;