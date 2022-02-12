import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import BookGrid from "../components/BookGrid";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState();
  const [bookSelectionId, setBookSelectionId] = useState();
  const [buttonSelect, setButtonSelect] = useState(true)


  const handleSelect = (selection) => {
    console.log('selection', selection)
    setBookSelectionId(selection[0])
    setButtonSelect(false)
  }

  const handleDelete = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/books/deleteBook/${bookSelectionId}`
    );
    console.log('response', response)
    navigate(0)
  }

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

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h4" componant="div" gutterBottom>Your Library:</Typography>
        <BookGrid bookData={books} handleSelect={handleSelect}/>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={2} sx={{ paddingTop: "10px" }}>
            <Button variant="outlined" disabled={!buttonSelect} href={"/add-book"} sx={{ fontSize: "10px" }}>
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
              onClick={handleDelete}
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
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default HomePage;
