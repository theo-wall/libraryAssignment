import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
} from "@mui/material";

import BookGrid from "../components/BookGrid";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const HomePage = () => {
  // navigate hook
  const navigate = useNavigate();
  // state variable to control when the books list is
  // displayed, the selected book id, and to disable/enable buttons
  const [books, setBooks] = useState();
  const [bookSelectionId, setBookSelectionId] = useState();
  const [buttonSelect, setButtonSelect] = useState(true);

  // state variable to open and close delete modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // pulls book id from DataGrid Component for edit/delete functions
  const handleSelect = (selection) => {
    console.log("selection", selection);
    setBookSelectionId(selection[0]);
    setButtonSelect(false);
  };

  // deletes current selected book from DataGrid
  const handleDelete = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/books/deleteBook/${bookSelectionId}`
    );
    console.log("response", response);
    navigate(0);
  };

  // fetched the full booklist from back end to be displayed
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/books/listBooks`
        );
        if (response.status) {
          setBooks(response.data);
        }
      } catch (e) {
        console.log("Error", e);
      }
    };
    getBooks();
  }, []);

  // grid component formats the DataGrid component and buttons displayed below for Add/Edit/Delete functions
  const grid = (
    <React.Fragment>
      <ConfirmDeleteModal open={open} handleClose={handleClose} handleDelete={handleDelete} />
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          Your Library:
        </Typography>
        <BookGrid bookData={books} handleSelect={handleSelect} />
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={2} sx={{ paddingTop: "10px" }}>
            <Button
              variant="outlined"
              disabled={!buttonSelect}
              href={"/add-book"}
              sx={{ fontSize: "10px" }}
            >
              Add Book
            </Button>
          </Grid>
          <Grid item xs={2} sx={{ paddingTop: "10px" }}>
            <Button
              variant="outlined"
              href={`/add-book/${bookSelectionId}`}
              disabled={buttonSelect}
              sx={{ fontSize: "10px" }}
            >
              Edit Book
            </Button>
          </Grid>
          <Grid item xs={2} sx={{ paddingTop: "10px" }}>
            <Button
              variant="outlined"
              onClick={handleOpen}
              color="error"
              disabled={buttonSelect}
              sx={{ fontSize: "10px" }}
            >
              Delete Book
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275, padding: "1em 3em" }}>
      <Card variant="outlined">{grid}</Card>
    </Box>
  );
};

export default HomePage;
