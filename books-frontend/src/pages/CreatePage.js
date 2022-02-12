import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [yearOfPublishing, setYearOfPublishing] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");

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

  const handleSubmit = async () => {
    const newBook = {
      name,
      author,
      yearOfPublishing,
      isbnNumber,
    };
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/books/createBook`, newBook);
    if (response) {
      navigate("/")
    }
  };

  const handleEdit = async () => {
    const newEdit = {
      name,
      author,
      yearOfPublishing,
      isbnNumber,
    };
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/books/updateBook/${id}`, newEdit
    );
    if (response) {
      navigate("/")
    }
  };

  const card = (
    <React.Fragment>
      <CardContent>
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
    <Box sx={{ minWidth: 500, padding: "1em 10em" }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default CreatePage;
