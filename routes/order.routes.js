const express = require("express");
const Order = require("../models/Order.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

router.get("/orders", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  Order.find({ user: userId })
    .populate({ path: "products.product", select: "image name price" })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/orders/:id", isAuthenticated, (req, res, next) => {
  const userId = req.params.id;
  const authenticatedUserId = req.payload._id;
  if (userId !== authenticatedUserId) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  Order.find({ user: userId })
    .populate({ path: "products.product", select: "image name price" })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/orders", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  const { products } = req.body;
  const total = products.reduce(
    (acc, product) => acc + product.priceAtPurchase,
    0
  );

  const newOrder = new Order({
    user: userId,
    products: products.map((product) => ({
      product: product.product,
      quantity: product.quantity,
      priceAtPurchase: product.priceAtPurchase,
    })),
    total,
  });

  newOrder
    .save()
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/orders/:id", isAuthenticated, (req, res, next) => {
  const orderId = req.params.id;
  const { product, quantity, priceAtPurchase } = req.body;

  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const newProduct = {
        product: product,
        quantity: quantity,
        priceAtPurchase: priceAtPurchase,
      };

      order.products.push(newProduct);
      order.total += quantity * priceAtPurchase;

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
