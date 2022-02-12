import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BookGrid from "../components/BookGrid";
import axios from "axios"
import { useState, useEffect } from "react";

const card = (
  <React.Fragment>
    <CardContent>
      <BookGrid />
    </CardContent>
  </React.Fragment>
);

const HomePage = () => {
  const [books, setBooks] = useState()

  useEffect(() => {
    const getBooks = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/listBooks`);
      console.log('response', response)
    }
    getBooks()
  }, [])
  

  return (
    <Box sx={{ minWidth: 275, padding: "1em 3em" }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default HomePage;
