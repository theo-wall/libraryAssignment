import * as React from "react";
import {
  Typography,
  FormControl,
  Button,
  TextField,
  CardContent,
  Card,
  Box,
} from "@mui/material";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreatePage = () => {
  // receives id parameter from URL
  const { id } = useParams();
  // navigate hook
  const navigate = useNavigate();
  // state hooks for inputs
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [yearOfPublishing, setYearOfPublishing] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");

  // fetches book to be edited from back-end only if a id is passed in as a parameter and sets the input values
  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/books/findBook/${id}`
        );
        console.log("response", response);
        setName(response.data.name);
        setAuthor(response.data.author);
        setYearOfPublishing(response.data.yearOfPublishing);
        setIsbnNumber(response.data.isbnNumber);
      } catch (e) {
        console.log(e);
      }
    };
    if (id) {
      getBook();
    }
  }, [id]);

  // Handles the Add book function, creates new book object and sends to back end to be saved in memory
  const handleSubmit = async () => {
    const newBook = {
      name,
      author,
      yearOfPublishing,
      isbnNumber,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/books/createBook`,
      newBook
    );
    if (response) {
      navigate("/");
    }
  };

  // Handles the Edit book function, edits the fetched book object and sends to back end to update the found book
  const handleEdit = async () => {
    const newEdit = {
      name,
      author,
      yearOfPublishing,
      isbnNumber,
    };
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/books/updateBook/${id}`,
      newEdit
    );
    if (response) {
      navigate("/");
    }
  };

  // card component formats the input components
  const card = (
    <React.Fragment>
      <CardContent>
        {/* controls what page title is display Add Book or Edit Book */}
        {id ? (
          <Typography variant="h4" componant="div" gutterBottom>
            Edit Book:
          </Typography>
        ) : (
          <Typography variant="h4" componant="div" gutterBottom>
            Add Book:
          </Typography>
        )}

        <FormControl fullWidth>
          <TextField
            id="book-title"
            label="Book Title"
            variant="outlined"
            fullWidth
            focused={Boolean(id)}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            sx={{ margin: "10px 10px 10px 0" }}
          />
          <TextField
            id="book-author"
            label="Book Author"
            variant="outlined"
            fullWidth
            focused={Boolean(id)}
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
            sx={{ margin: "10px 10px 10px 0" }}
          />
          <TextField
            id="year-of-publication"
            label="Year Of Publication"
            variant="outlined"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            min="0"
            fullWidth
            focused={Boolean(id)}
            value={yearOfPublishing}
            onChange={(event) => {
              setYearOfPublishing(event.target.value);
            }}
            sx={{ margin: "10px 10px 10px 0" }}
          />
          <TextField
            id="isbn-number"
            label="ISBN Number"
            variant="outlined"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            min="0"
            fullWidth
            focused={Boolean(id)}
            value={isbnNumber}
            onChange={(event) => {
              setIsbnNumber(event.target.value);
            }}
            sx={{ margin: "10px 10px 10px 0" }}
          />
          {/* 
          controls what button is rendered to display the correct button to fire 
          the handle submit or handle edit functions 
          */}
          {id ? (
            <Button
              variant="outlined"
              onClick={handleEdit}
              sx={{ fontSize: "10px" }}
            >
              Submit Book Edit
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleSubmit}
              sx={{ fontSize: "10px" }}
            >
              Submit New Book
            </Button>
          )}
        </FormControl>
      </CardContent>
    </React.Fragment>
  );

  return (
    // container for the input card for formatting
    <Box sx={{ minWidth: 500, padding: "1em 10em" }}>
      {/* card component from above is added here as variable */}
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default CreatePage;
