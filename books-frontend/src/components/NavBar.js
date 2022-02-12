import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const NavBar = ({ children }) => {
  // navigation header for simple navigation of the app
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* header title */}
          <Typography variant="h6" color="inherit" component="div">
            Books
          </Typography>
          {/* Home button navigation item */}
          <MenuItem
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography textAlign="center">Home</Typography>
          </MenuItem>
          {/* Add Book button navigation item */}
          <MenuItem
            onClick={() => {
              navigate("/add-book");
            }}
          >
            <Typography textAlign="center">Add A Book</Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
      {/* nav bar is wrapped around all front end routes */}
      {children}
    </Box>
  );
};

export default NavBar;
