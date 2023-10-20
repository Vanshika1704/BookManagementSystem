const express = require("express"); // access to express
const jwt = require("jsonwebtoken");

const router = express.Router(); // this fxn is provided by express using which we can create a separate routers and mount different routes on top of this router
//its similar to app but u can define diff type of routes here

//move books array from server. js to here

// const books = [
//   {
//     id: 1,
//     titile: " Harry potter and the chamber of Secrets",
//     author: "JK rowling",
//     year: 1999,
//     pages: 317,
//     publisher: "Bloomsbury",
//     language: "English",
//   },
//   {
//     id: 2,
//     titile: " Harry potter and the dumb bell",
//     author: "JK rowling",
//     year: 2021,
//     pages: 317,
//     publisher: "Bloomsbury",
//     language: "English",
//   },
//   {
//     id: 3,
//     titile: " Harry potter and the layman people",
//     author: "JK rowling",
//     year: 2006,
//     pages: 317,
//     publisher: "Bloomsbury",
//     language: "English",
//   },
// ];
// books array is no longer required after we have defined a collection schema in models/book.js

const Book = require("../models/book");
const jwtVerify = (req, res, next) => {
  console.log("headers", req.headers);
  const authToken = req.headers.authorization; //jwt token that client is sending in the header
  const decodedToken = jwt.verify(authToken, process.env.JWT_TOKEN);
  req.user=decodedToken;
  
  console.log({ decodedToken });

  next();
};
router.use(jwtVerify);

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

router.get("/", async (req, res) => {
  // res.send(books); //after setting up the mongoose model in models/book.js
  // we no longer have access to this hard coded books[]
  // now using mongoose provided fxn we will find all the elements in the Book collection that we created in models/book.js
  const books = await Book.find();
  //Book.find() will return us a promise. to fix this we will have to use keywords async and await
  res.send(books);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById();
  // res.send(books[id - 1]);
  res.send(book);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const book = req.body;
  //these 2 lines will not work after we have created the Book model
  // book.id = books.length + 1;
  // books.push(book);
  const dbBook = await Book.create(book);
  res.send(dbBook);
});

//update api call
// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   const book = books[id - 1];
//   books.splice(id - 1, 1);
//   res.send(book);
// });

module.exports = router;
