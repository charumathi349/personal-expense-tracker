import React, { useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Button
} from "@mui/material";

function Settings() {

  const [settings, setSettings] = useState({
    name: "",
    email: "",
    currency: "INR",
    darkMode: false,
    notifications: true
  });

  const currencies = ["INR", "USD", "EUR", "GBP"];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper style={{ padding: 20, width:1000 }}>

        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={settings.name}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={settings.email}
          onChange={handleChange}
        />

        <TextField
          select
          label="Currency"
          name="currency"
          fullWidth
          margin="normal"
          value={settings.currency}
          onChange={handleChange}
        >
          {currencies.map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Switch
              checked={settings.darkMode}
              onChange={handleChange}
              name="darkMode"
            />
          }
          label="Dark Mode"
        />

        <br />

        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications}
              onChange={handleChange}
              name="notifications"
            />
          }
          label="Enable Notifications"
        />

        <br />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={saveSettings}
        >
          Save Settings
        </Button>

      </Paper>
    </div>
  );
}

export default Settings;