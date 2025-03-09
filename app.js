const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./router/productsRouter");
const { getProducts } = require("./router/productsRouter");
const mongodb = require("mongodb");

require("dotenv").config();
app.use(cors());
app.use(express.json());

const USER_NAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const connectUri = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.i6b4s.mongodb.net/${DB_NAME}`;
console.log(connectUri);

mongoose
  .connect(connectUri)
  .then(() => console.log("connecting to mongodb successfully"))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 8000;

// Routes
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.json({
    status: true,
    code: 200,
    message: " mongodb connected sucessfully !",
  });
});

//-------  Middleware & Error Handling---------
// 404 handle error
app.use("/", (req, res, next) => {
  res.status(404).json({
    status: false,
    code: 404,
    message: "page not found",
  });
});

// 500 handle error
app.get("/", (req, res, next) => {
  next(new Error("Not Found"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
