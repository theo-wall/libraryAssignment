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
import DuplicateModal from "../components/DuplicateModal";

const CreatePage = () => {
  // receives id parameter from URL
  const { id } = useParams();
  // navigate hook
  const navigate = useNavigate();
  // state hooks for inputs
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [yearOfPublishing, setYearOfPublishing] = useState("");
  const [isdnNumber, setIsdnNumber] = useState("");

  // state variable to open and close duplicate modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const minValue = 1;
  const maxValue = 9999;

  const minValueIsdn = 1;
  const maxValueIsdn = 9999999999999;

  const handleYear = (e) => {
    const newValue = Math.min(Math.max(e.target.value, minValue), maxValue);
    if (newValue < 9999) {
      setYearOfPublishing(newValue);
    }
  };

  const handleIsdn = (e) => {
    const newValue = Math.min(Math.max(e.target.value, minValueIsdn), maxValueIsdn);
    if (newValue < 9999999999999) {
      setIsdnNumber(newValue);
    }
  }

  // fetches book to be edited from back-end only if a id is passed in as a parameter and sets the input values
  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/books/findBook/${id}`
        );
        setName(response.data.name);
        setAuthor(response.data.author);
        setYearOfPublishing(response.data.yearOfPublishing);
        setIsdnNumber(response.data.isdnNumber);
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
    try {
      const newBook = {
        name,
        author,
        yearOfPublishing,
        isdnNumber,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/books/createBook`,
        newBook
      );
      if (response) {
        navigate("/");
      }
    } catch (e) {
      handleOpen();
    }
  };

  // Handles the Edit book function, edits the fetched book object and sends to back end to update the found book
  const handleEdit = async () => {
    const newEdit = {
      name,
      author,
      yearOfPublishing,
      isdnNumber,
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
      <DuplicateModal open={open} handleClose={handleClose} />
      <CardContent>
        {/* controls what page title is display Add Book or Edit Book */}
        {id ? (
          <Typography variant="h4" component="div" gutterBottom>
            Edit Book:
          </Typography>
        ) : (
          <Typography variant="h4" component="div" gutterBottom>
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
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            fullWidth
            focused={Boolean(id)}
            value={yearOfPublishing}
            onChange={(event) => {
              handleYear(event);
            }}
            sx={{ margin: "10px 10px 10px 0" }}
          />
          <TextField
            id="isdn-number"
            label="ISDN Number"
            variant="outlined"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            min="0"
            fullWidth
            focused={Boolean(id)}
            value={isdnNumber}
            onChange={(event) => {
              handleIsdn(event)
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
              disabled={!name || !author || !yearOfPublishing || !isdnNumber}
              sx={{ fontSize: "10px" }}
            >
              Submit New Book
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
            sx={{ fontSize: "10px", marginTop: "10px" }}
          >
            Cancel
          </Button>
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
