import React from "react";
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RecentTransactions({ expenses, deleteExpense }) {

    // Backend delete
    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:8081/api/expenses/${id}`);
            deleteExpense(id); // Update parent state
        } catch (err) {
            console.error("Error deleting expense:", err);
        }
    };
    const navigate = useNavigate();
    return ( <
        div style = {
            { padding: "20px" } } >
        <
        Typography variant = "h4"
        gutterBottom >
        Recent Transactions <
        /Typography> <
        TableContainer component = { Paper }
        style = {
            { boxShadow: "0 4px 20px rgba(0,0,0,0.1)" } } >
        <
        Table >
        <
        TableHead >
        <
        TableRow >
        <
        TableCell > < Typography variant = "h6" > < b > Title < /b></Typography > < /TableCell> <
        TableCell > < Typography variant = "h6" > < b > Amount < /b></Typography > < /TableCell> <
        TableCell > < Typography variant = "h6" > < b > Category < /b></Typography > < /TableCell> <
        TableCell > < Typography variant = "h6" > < b > Date < /b></Typography > < /TableCell> <
        TableCell > < Typography variant = "h6" > < b > Payment < /b></Typography > < /TableCell> <
        TableCell > < Typography variant = "h6" > < b > Actions < /b></Typography > < /TableCell> <
        /TableRow> <
        /TableHead> <
        TableBody > {
            expenses.map((exp) => ( <
                TableRow key = { exp.id } >
                <
                TableCell > < Typography variant = "subtitle1" > { exp.title } < /Typography></TableCell >
                <
                TableCell > < Typography variant = "subtitle1" > ₹{ exp.amount } < /Typography></TableCell >
                <
                TableCell > < Typography variant = "subtitle1" > { exp.category } < /Typography></TableCell >
                <
                TableCell > < Typography variant = "subtitle1" > { exp.date } < /Typography></TableCell >
                <
                TableCell > < Typography variant = "subtitle1" > { exp.paymentMethod } < /Typography></TableCell >
                <
                TableCell >
                <
                Button variant = "outlined"
                color = "primary"
                size = "small"
                style = {
                    { marginRight: 8 } }
                onClick = {
                    () => navigate(`/edit/${exp.id}`) } >
                Edit <
                /Button> <
                Button variant = "outlined"
                color = "error"
                size = "small"
                onClick = {
                    () => handleDelete(exp.id) } >
                Delete <
                /Button> <
                /TableCell> <
                /TableRow>
            ))
        } {
            expenses.length === 0 && ( <
                TableRow >
                <
                TableCell colSpan = { 6 }
                align = "center" >
                No transactions found. <
                /TableCell> <
                /TableRow>
            )
        } <
        /TableBody> <
        /Table> <
        /TableContainer> <
        /div>
    );
}

export default RecentTransactions;