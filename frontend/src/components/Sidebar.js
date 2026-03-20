import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 380;

function Sidebar() {
    const pages = [
        { name: "Dashboard", path: "/" },
        { name: "Monthly Expenses", path: "/monthly" },
        { name: "Category Analysis", path: "/category" },
        { name: "Spending Trend", path: "/trend" },
        { name: "Recent Transactions", path: "/transactions" },
        { name: "Add Expense", path: "/add" },
        { name: "Expense Details", path: "/details" },
        { name: "Reports", path: "/reports" },
        { name: "Settings", path: "/settings" },
    ];

    return ( <
        Drawer variant = "permanent"
        sx = {
            {
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: "linear-gradient(180deg,#1d976c,#093637)",
                    color: "#ffffff",
                    height: "calc(100vh - 64px)",
                    top: "72px",
                    overflowY: "auto",
                    overflowX: "hidden"
                }
            }
        } >
        <
        List > {
            pages.map((page) => ( <
                ListItem button component = { Link }
                to = { page.path }
                key = { page.name }
                sx = {
                    {
                        margin: "40px 10px",
                        borderRadius: "30px",
                        padding: "12px 20px",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        justifyContent: "center",
                        transition: "0.3s",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.25)"
                        }
                    }
                } >
                <
                ListItemText primary = { page.name }
                primaryTypographyProps = {
                    {
                        style: {
                            color: "#fff",
                            fontSize: "30px",
                            fontWeight: "700",

                            letterSpacing: "1.5px",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            textAlign: "center"
                        }
                    }
                }
                /> <
                /ListItem>
            ))
        } <
        /List> <
        /Drawer>
    );
}

export default Sidebar;