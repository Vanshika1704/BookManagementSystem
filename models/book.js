//to create a new book collection in db
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  pages: Number,
  publisher: String,
  language: String,
});

const Book = mongoose.model("Book", bookSchema); //this mongoose model/object will help us to talk to the DB
module.exports = Book;
//after this hardcodes books[] in router/book.js will not be needed
