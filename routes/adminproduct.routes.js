const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Get all products
router.get("/admin/products", isAuthenticated, (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((err) =>
      res.status(400).json({ message: "Error fetching products", error: err })
    );
});

// Get a single product by ID
router.get("/admin/products/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => res.status(200).json(product))
    .catch((err) =>
      res.status(400).json({ message: "Error fetching product", error: err })
    );
});

// Create a new product
router.post("/admin/products", isAuthenticated, (req, res, next) => {
  const {
    name,
    price,
    description,
    category,
    brand,
    image,
    rating,
    numReviews,
    countInStock,
  } = req.body;
  Product.create({
    name,
    price,
    description,
    category,
    brand,
    image,
    rating,
    numReviews,
    countInStock,
  })
    .then((product) => res.status(201).json(product))
    .catch((err) =>
      res.status(400).json({ message: "Error creating product", error: err })
    );
});

// Update an existing product
router.put("/admin/products/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  Product.findByIdAndUpdate(id, { name, description, price }, { new: true })
    .then((product) => res.status(200).json(product))
    .catch((err) =>
      res.status(400).json({ message: "Error updating product", error: err })
    );
});

// Delete a product
router.delete("/admin/products/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then(() => res.status(204).json())
    .catch((err) =>
      res.status(400).json({ message: "Error deleting product", error: err })
    );
});

module.exports = router;
