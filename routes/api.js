const express = require("express");
const router = express.Router();
const Book = require("./../models/book");
const Author = require("./../models/author");

//Middleware
router.use("/books/:book", (req, res, next) => {
  Book.findById(req.params.book, (err, book) => {
    if (err) {
      return res.status(401).send("error!");
    }
    if (book) {
      req.book = book;
      return next();
    }
    return res.status(404).send("Not Found!");
  });
});

//Get a list of all the books in the dB
router.get("/books", (req, res) => {
  Book.find({}).then((books) => {
    if (books) {
      const booksUpdated = books.map((item) => {
        const i = item.toObject();
        i._links = {
          rel: "self",
          href: "http://localhost:4000/api/books/" + item._id,
        };
        return i;
      });
      return res.json(booksUpdated);
    }
    return res.status(401).send("No books currently in the database!");
  });
});

//Add a new book to the dB
router.post("/books", (req, res) => {
  const newBook = new Book(req.body);
  newBook.save((err) => {
    if (err) {
      return res.status(401).send("error in saving");
    }
    return res.sendStatus(200);
  });
});

//get a specific book out of the dB via ID
router.get("/books/:book", (req, res) => {
  let i = req.book.toObject();
  i._links = [
    {
      rel: "self",
      href: "http://localhost:4000/api/books/" + req.book._id,
    },
    {
      rel: "list/all",
      href: "http://localhost:4000/api/books",
    },
  ];
  res.json(i);
});

//update a book via put
//provide data of the whole book to update
router.put("/books/:book", (req, res) => {
  const book = req.book;
  book.title = req.body.title;
  book.genre = req.body.genre;
  book.author = req.body.author;
  book.save((err) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
});

//update book via patch
//only provide what you want to update
router.patch("/books/:book", (req, res) => {
  const { book } = req;
  if (req.body._id) {
    delete req.body._id;
  }
  Object.entries(req.body).forEach((item) => {
    const key = item[0];
    const value = item[1];
    book[key] = value;
  });
  book.save((err) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
});

//delete a book from the dB
router.delete("/books/:book", (req, res) => {
  req.book.remove((err) => {
    if (err) {
      return res.send(err);
    }
    return res.sendStatus(204);
  });
});

module.exports = router;
