const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 1,
  },
  desc: {
    type: String,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  review: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("products", Schema);
module.exports = Product;
