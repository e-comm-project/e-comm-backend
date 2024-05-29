const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
// GET all products
router.get("/products", (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// GET a specific product by ID
router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// POST a new product
router.post("/products", isAuthenticated, (req, res) => {
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
  const { role } = req.payload;
  if (role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
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
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// PUT/update a product by ID
router.put("/products/:id", (req, res) => {
  const id = req.params.id;
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
  Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      description,
      category,
      brand,
      image,
      rating,
      numReviews,
      countInStock,
    },
    { new: true }
  )
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE a product by ID
router.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
