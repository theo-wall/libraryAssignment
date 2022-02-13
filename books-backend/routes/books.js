let { books } = require("../bookData");

var express = require("express");
var router = express.Router();

let bookIdCounter = books.length + 1;

// GET Endpoint || description: http://localhost:4000/books/listBooks
// Finds all data in the bookData.js file and sends it to front end with 200 status
router.get("/listBooks", function (req, res) {
  res.status(200).json(books);
});

// GET Endpoint || description: http://localhost:4000/books/findBook
// Finds specific book by :id in the bookData.js and sends book data to front end with 200 status
router.get("/findBook/:id", function (req, res) {
  const bookId = req.params.id;

  // maps through json data returns book with matching id
  let foundBook = books.find((book) => {
    return book.id === parseInt(bookId);
  });
  if (foundBook) {
    res.status(200).json(foundBook);
  } else {
    res.sendStatus(404);
  }
});

// POST Endpoint || description: http://localhost:4000/books/createBook
// Creates a new book in browser memory sends all books back to front end with 201 status
router.post("/createBook", function (req, res) {
  let newBook = req.body;

  const foundName = books.find((book) => {
    return book.name === newBook.name;
  });

  if (foundName) {
    res.sendStatus(403)
  } else {
    // adds unique id to new book
    let newId = bookIdCounter + 1;
    bookIdCounter++
    
    newBook.id = newId;
    // adds book to bookData.js json
    books.push(newBook);
    res.status(201).json(books);
  }
});

// PUT Endpoint || description: http://localhost:4000/books/updateBook
// Finds book by id and updates existing book in bookData.js json
router.put("/updateBook/:id", function (req, res) {
  const bookId = req.params.id;

  // maps through json data returns book with matching id
  let foundBook = books.find((book) => {
    return book.id === parseInt(bookId);
  });
  // if book is found by id, the values are updated to the incoming json, id is kept the same
  if (foundBook) {
    updateBook = {
      id: foundBook.id,
      name: req.body.name,
      author: req.body.author,
      yearOfPublishing: req.body.yearOfPublishing,
      isdnNumber: req.body.isdnNumber,
    };
    // splices updated book object back into bookData.js json at the index that the book was found
    let editIndex = books.indexOf(foundBook);
    books.splice(editIndex, 1, updateBook);
    // updated book is sent back to front end with status of 200
    res.status(200).json(updateBook);
  } else {
    res.sendStatus(404);
  }
});

// DELETE Endpoint || description: http://localhost:4000/books/deleteBook
// finds book by id and deletes in from browser memory
router.delete("/deleteBook/:id", function (req, res) {
  const bookId = req.params.id;

  // maps through json data returns book with matching id
  let foundBook = books.find((book) => {
    return book.id === parseInt(bookId);
  });

  // if a book was found the object is deleted at the found book index
  if (foundBook) {
    let deleteIndex = books.indexOf(foundBook);
    books.splice(deleteIndex, 1);
    // status of 204 is sent back to front end to confirm deletion
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
