const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/api");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4000;

const app = express();
mongoose.connect("mongodb://localhost/booksDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose connection established!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);

app.listen(PORT, console.log(`Listening on Port ${PORT}!`));
