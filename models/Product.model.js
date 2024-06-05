const mongoose = require("mongoose");

//Product Model
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    enum: ["Men", "Women"],
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
