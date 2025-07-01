import { AppBar, Toolbar, Typography, Switch, FormControlLabel } from "@mui/material";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ToDo App
        </Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          label="Dark Mode"
        />
      </Toolbar>
    </AppBar>
  );
}
