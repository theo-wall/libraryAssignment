import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const NavBar = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Books
          </Typography>
          <MenuItem
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography textAlign="center">Home</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/add-book");
            }}
          >
            <Typography textAlign="center">Add A Book</Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default NavBar;
