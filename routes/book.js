const express = require("express"); // access to express

const router = express.Router(); // this fxn is provided by express using which we can create a separate routers and mount different routes on top of this router
//its similar to app but u can define diff type of routes here

//move books array from server. js to here

const books = [
  {
    id: 1,
    titile: " Harry potter and the chamber of Secrets",
    author: "JK rowling",
    year: 1999,
    pages: 317,
    publisher: "Bloomsbury",
    language: "English",
  },
  {
    id: 2,
    titile: " Harry potter and the dumb bell",
    author: "JK rowling",
    year: 2021,
    pages: 317,
    publisher: "Bloomsbury",
    language: "English",
  },
  {
    id: 3,
    titile: " Harry potter and the layman people",
    author: "JK rowling",
    year: 2006,
    pages: 317,
    publisher: "Bloomsbury",
    language: "English",
  },
];

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/", (req, res) => {
  console.log("this is coming from book.js");
  res.send(books);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(books[id - 1]);
});
router.post("/", (req, res) => {
  console.log(req.body);
  const book = req.body;
  book.id = books.length + 1;
  books.push(book);
  res.send(book);
});

//update api call
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const book = books[id - 1];
  books.splice(id - 1, 1);
  res.send(book);
});

module.exports = router;
