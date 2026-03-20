import React, { useState, useEffect } from "react"; // <-- useEffect import missing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import axios from "axios";

import DashboardOverview from "./pages/DashboardOverview";
import MonthlyExpenses from "./pages/MonthlyExpenses";
import CategoryAnalysis from "./pages/CategoryAnalysis";
import SpendingTrend from "./pages/SpendingTrend";
import RecentTransactions from "./pages/RecentTransactions";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import ExpenseDetails from "./pages/ExpenseDetails";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
    const [expenses, setExpenses] = useState([]);

    // Fetch expenses from backend
    const fetchExpenses = async() => {
        try {
            const res = await axios.get("http://localhost:8081/api/expenses");
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Add Expense
    const addExpense = async(expense) => {
        try {
            const res = await axios.post("http://localhost:8081/api/expenses", expense);
            setExpenses([res.data, ...expenses]);
        } catch (err) {
            console.error(err);
        }
    };

    // Delete Expense
    const deleteExpense = async(id) => {
        try {
            await axios.delete(`http://localhost:8081/api/expenses/${id}`);
            setExpenses(expenses.filter((exp) => exp.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // Update Expense
    const updateExpense = async(id, updatedExpense) => {
        try {
            const res = await axios.put(`http://localhost:8081/api/expenses/${id}`, updatedExpense);
            setExpenses(expenses.map((exp) => (exp.id === id ? res.data : exp)));
        } catch (err) {
            console.error(err);
        }
    };

    return ( <
            Router >
            <
            Navbar / >
            <
            div style = {
                { display: "flex", marginTop: "64px", width: "100%" } } >
            <
            Sidebar / >

            <
            div style = {
                {
                    flexGrow: 1,
                    padding: "30px",
                    minHeight: "calc(100vh - 64px)",
                    background: "linear-gradient(135deg,#f8f9fc)",
                    color: "#1B211A",
                    width: "100%"
                }
            } >

            <
            Routes >
            <
            Route path = "/"
            element = { < DashboardOverview expenses = { expenses }
                />} / >
                <
                Route path = "/monthly"
                element = { < MonthlyExpenses expenses = { expenses }
                    />} / >
                    <
                    Route path = "/category"
                    element = { < CategoryAnalysis expenses = { expenses }
                        />} / >
                        <
                        Route path = "/trend"
                        element = { < SpendingTrend expenses = { expenses }
                            />} / >
                            <
                            Route path = "/transactions"
                            element = { < RecentTransactions expenses = { expenses }
                                deleteExpense = { deleteExpense }
                                />} / >
                                <
                                Route path = "/add"
                                element = { < AddExpense addExpense = { addExpense }
                                    />} / >
                                    <
                                    Route path = "/edit/:id"
                                    element = { < EditExpense updateExpense = { updateExpense }
                                        />} / >
                                        <
                                        Route path = "/details"
                                        element = { < ExpenseDetails / > }
                                        /> <
                                        Route path = "/reports"
                                        element = { < Reports expenses = { expenses }
                                            />} / >
                                            <
                                            Route path = "/settings"
                                            element = { < Settings / > }
                                            /> <
                                            /Routes> <
                                            /div> <
                                            /div> <
                                            /Router>
                                        );
                                    }

                                    export default App;