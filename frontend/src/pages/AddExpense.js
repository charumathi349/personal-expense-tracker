import React, { useState } from "react";
import { Paper, Typography, TextField, Button, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";

function AddExpense({ addExpense }) {
    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        paymentMethod: "",
        date: "",
        recurring: false,
        notes: "",
        location: "",
        tax: "",
        priority: "",
    });

    const categories = ["Food", "Transport", "Bills", "Entertainment", "Shopping", "Others"];
    const paymentMethods = ["Cash", "Card", "UPI", "Wallet"];
    const priorities = ["High", "Medium", "Low"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setExpense({...expense, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            // POST to backend
            const res = await axios.post("http://localhost:8081/api/expenses", expense);
            // Update parent state
            addExpense(res.data);
            // Reset form
            setExpense({
                title: "",
                amount: "",
                category: "",
                paymentMethod: "",
                date: "",
                recurring: false,
                notes: "",
                location: "",
                tax: "",
                priority: "",
            });
        } catch (err) {
            console.error("Error adding expense:", err);
        }
    };

    return ( <
        Paper style = {
            { padding: 20 } } >
        <
        Typography variant = "h4"
        gutterBottom > Add Expense < /Typography> <
        form onSubmit = { handleSubmit } >
        <
        TextField name = "title"
        label = "Title"
        fullWidth value = { expense.title }
        onChange = { handleChange }
        margin = "normal"
        required /
        >
        <
        TextField name = "amount"
        label = "Amount"
        type = "number"
        fullWidth value = { expense.amount }
        onChange = { handleChange }
        margin = "normal"
        required /
        >
        <
        TextField select name = "category"
        label = "Category"
        fullWidth value = { expense.category }
        onChange = { handleChange }
        margin = "normal"
        required >
        {
            categories.map((cat) => ( <
                MenuItem key = { cat }
                value = { cat } > { cat } < /MenuItem>
            ))
        } <
        /TextField> <
        TextField select name = "paymentMethod"
        label = "Payment Method"
        fullWidth value = { expense.paymentMethod }
        onChange = { handleChange }
        margin = "normal"
        required >
        {
            paymentMethods.map((pm) => ( <
                MenuItem key = { pm }
                value = { pm } > { pm } < /MenuItem>
            ))
        } <
        /TextField> <
        TextField name = "date"
        label = "Date"
        type = "date"
        fullWidth InputLabelProps = {
            { shrink: true } }
        value = { expense.date }
        onChange = { handleChange }
        margin = "normal"
        required /
        >
        <
        FormControlLabel control = { < Checkbox name = "recurring"
            checked = { expense.recurring }
            onChange = { handleChange }
            />}
            label = "Recurring?" /
            >
            <
            TextField
            name = "notes"
            label = "Notes"
            fullWidth
            multiline
            rows = { 2 }
            value = { expense.notes }
            onChange = { handleChange }
            margin = "normal" /
            >
            <
            TextField
            name = "location"
            label = "Location / Vendor"
            fullWidth
            value = { expense.location }
            onChange = { handleChange }
            margin = "normal" /
            >
            <
            TextField
            name = "tax"
            label = "Tax / GST"
            type = "number"
            fullWidth
            value = { expense.tax }
            onChange = { handleChange }
            margin = "normal" /
            >
            <
            TextField
            select
            name = "priority"
            label = "Priority"
            fullWidth
            value = { expense.priority }
            onChange = { handleChange }
            margin = "normal" >
            {
                priorities.map((p) => ( <
                    MenuItem key = { p }
                    value = { p } > { p } < /MenuItem>
                ))
            } <
            /TextField> <
            Button
            type = "submit"
            variant = "contained"
            color = "primary"
            fullWidth
            style = {
                { marginTop: 20 } } >
            Add Expense <
            /Button> <
            /form> <
            /Paper>
        );
    }

    export default AddExpense;