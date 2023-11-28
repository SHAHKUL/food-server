require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authController = require("./controller/authController");
const productController = require("./controller/productController");

mongoose.connect(process.env.URL);

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

///rouute Andn middleware
app.use("/auth", authController);

app.use("/prod", productController);

app.listen(process.env.PORT, () => {
  console.log("server connected");
});
