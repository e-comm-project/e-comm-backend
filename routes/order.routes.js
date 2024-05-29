const express = require("express");
const Order = require("../models/Order.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

router.get("/orders/:id", isAuthenticated, (req, res, next) => {
  const userId = req.params.id;
  const authenticatedUserId = req.payload._id;
  if (userId !== authenticatedUserId) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  Order.find({ user: userId })
    .populate({ path: "products.product", select: "images name  price" })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/orders", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  const { products } = req.body; // products should be an array of product IDs
  const total = products.reduce(
    (acc, product) => acc + product.priceAtPurchase,
    0
  );
  // check if the user already has an order  to add a new product inside the products array
  // Create a new order
  const newOrder = new Order({
    user: userId,
    products: products.map((product) => ({
      product: product.product, // Ensure product is an ObjectId
      quantity: product.quantity,
      priceAtPurchase: product.priceAtPurchase,
    })),
    total,
  });
  // Save the new order to the database
  newOrder
    .save()
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((err) => {
      next(err);
    });
});

// {
//   $push: { products: { $each: newProducts } },
//   $inc: { total: total },
// },
// { new: true }

router.put("/orders/:id", isAuthenticated, (req, res, next) => {
  const orderId = req.params.id;
  const { product, quantity, priceAtPurchase } = req.body;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Create a new product object
      const newProduct = {
        product: product,
        quantity: quantity,
        priceAtPurchase: priceAtPurchase,
      };

      // Add the new product to the order's products array
      order.products.push(newProduct);

      // Recalculate the total price based on the updated products
      order.total += quantity * priceAtPurchase;

      // Save the updated order to the database
      return order.save();
    })
    .then((updatedOrder) => {
      res.status(200).json(updatedOrder);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/orders/:id", isAuthenticated, (req, res, next) => {
  const orderId = req.params.id;
  const userId = req.payload._id;
  Order.findOneAndDelete({ _id: orderId, user: userId })
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
