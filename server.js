require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const bookRouter = require("./routes/book");
app.use("/api/books", bookRouter);

const userRouter = require("./routes/user");
app.use("/api/users", userRouter);

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});
// const PORT = 8080; hard coding of port number- not ideal because something else might be running here
//process.env holds all environment variables values
const PORT = process.env.PORT;
console.log({ PORT });
//gives undefined  because we havent defined the value of PORT - either put it in evironment variables or
//create .env file and mention it inside .gitignore file - dont push node_modules and .env file to git (if still unaccessible server.js dosent know that .env file is there)
//---> go and read .env file, parse it and put all variables inside the process.env variable --> use dotenv package from the net
//create .gitignore and .env file manually


app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}.`);
});
const logger = (req, res, next) => {
  console.log(`Middleware: Received ${req.method} on ${req.url}`);
  next();
};
app.use(logger);

const secondLogger = (req, res, next) => {
  console.log(`Second Middleware: Received ${req.method} on ${req.url}`);
  next();
};
app.use(secondLogger);

