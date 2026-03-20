import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
  return (
   <AppBar
  position="fixed"
  sx={{
    alignItems:"center",
    background: "linear-gradient(180deg,#1d976c,#093637)",
    color: "#f7f7f8"
  }}
>
      <Toolbar>
        <Typography variant="h2">Expense Tracker Pro</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;