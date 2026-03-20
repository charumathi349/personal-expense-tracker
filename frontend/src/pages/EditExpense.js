import React, { useState, useEffect } from "react";
import {
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function EditExpense() {
    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const [expense, setExpense] = useState({
        id: "",
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

    // Load expense data
    useEffect(() => {

        const fetchExpense = async() => {
            try {
                const res = await axios.get(`http://localhost:8081/api/expenses/${id}`);
                setExpense(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchExpense();

    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setExpense({
            ...expense,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleUpdate = async(e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:8081/api/expenses/${expense.id}`,
                expense
            );

            alert("Expense updated successfully");

            navigate("/transactions");
        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };

    return ( <
        Paper style = {
            { padding: 25, maxWidth: 700, margin: "auto" } } >
        <
        Typography variant = "h4"
        gutterBottom >
        Edit Expense <
        /Typography>

        <
        form onSubmit = { handleUpdate } >
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
        margin = "normal" >
        {
            categories.map((cat) => ( <
                MenuItem key = { cat }
                value = { cat } > { cat } <
                /MenuItem>
            ))
        } <
        /TextField>

        <
        TextField select name = "paymentMethod"
        label = "Payment Method"
        fullWidth value = { expense.paymentMethod }
        onChange = { handleChange }
        margin = "normal" >
        {
            paymentMethods.map((pm) => ( <
                MenuItem key = { pm }
                value = { pm } > { pm } <
                /MenuItem>
            ))
        } <
        /TextField>

        <
        TextField name = "date"
        label = "Date"
        type = "date"
        fullWidth value = { expense.date }
        onChange = { handleChange }
        margin = "normal"
        InputLabelProps = {
            { shrink: true } }
        />

        <
        FormControlLabel control = { <
            Checkbox
            name = "recurring"
            checked = { expense.recurring }
            onChange = { handleChange }
            />
        }
        label = "Recurring Expense" /
        >

        <
        TextField name = "notes"
        label = "Notes"
        fullWidth multiline rows = { 3 }
        value = { expense.notes }
        onChange = { handleChange }
        margin = "normal" /
        >

        <
        TextField name = "location"
        label = "Location / Vendor"
        fullWidth value = { expense.location }
        onChange = { handleChange }
        margin = "normal" /
        >

        <
        TextField name = "tax"
        label = "Tax / GST"
        type = "number"
        fullWidth value = { expense.tax }
        onChange = { handleChange }
        margin = "normal" /
        >

        <
        TextField select name = "priority"
        label = "Priority"
        fullWidth value = { expense.priority }
        onChange = { handleChange }
        margin = "normal" >
        {
            priorities.map((p) => ( <
                MenuItem key = { p }
                value = { p } > { p } <
                /MenuItem>
            ))
        } <
        /TextField>

        <
        Button type = "submit"
        variant = "contained"
        color = "primary"
        fullWidth style = {
            { marginTop: 20 } } >
        Update Expense <
        /Button> <
        /form> <
        /Paper>
    );
}

export default EditExpense;