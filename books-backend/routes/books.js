let bookData = require('../bookData')

var express = require('express');
var router = express.Router();

// GET Endpoint || description: http://localhost:4000/books/listBooks 
router.get('/listBooks', function(req, res, next) {
  res.status(200).json(bookData.books);
});

// GET Endpoint || description: http://localhost:4000/books/findBook 
router.get('/findBook/:id', function(req, res, next) {
  const bookId = req.params.id;

  let foundBook = bookData.books.find((book) => {
    return book.id === parseInt(bookId);
  });
  if(foundBook) {
    res.status(200).json(foundBook);
  }
  else {
    res.sendStatus(404)
  }
});

// POST Endpoint || description: http://localhost:4000/books/createBook 
router.post('/createBook', function(req, res, next) {
  let newBook = req.body
  let newId = bookData.books.length + 1
  newBook.id = newId
  bookData.books.push(newBook)
  res.status(201).json(bookData.books)
});

// PUT Endpoint || description: http://localhost:4000/books/updateBook 
router.put('/updateBook/:id', function(req, res) {
  const bookId = req.params.id

  let foundBook = bookData.books.find((book) => {
    return book.id === parseInt(bookId)
  })
  if (foundBook) {
    updateBook = {
      id: foundBook.id,
      name: req.body.name,
      author: req.body.author,
      yearOfPublishing: req.body.yearOfPublishing,
      isbnNumber: req.body.isbnNumber,
    }
    let editIndex = bookData.books.indexOf(foundBook)
    bookData.books.splice(editIndex, 1, updateBook)
    res.status(200).json(updateBook);
  } 
  else {
    res.sendStatus(404)
  }
});

// DELETE Endpoint || description: http://localhost:4000/books/deleteBook 
router.delete('/deleteBook/:id', function(req, res) {
  const bookId = req.params.id;

  let foundBook = bookData.books.find((book) => {
    return book.id === parseInt(bookId);
  });

  if(foundBook) {
    let deleteIndex = bookData.books.indexOf(foundBook)
    bookData.books.splice(deleteIndex, 1)
    res.sendStatus(204)
  }
  else {
    res.sendStatus(404)
  }

})

module.exports = router;
