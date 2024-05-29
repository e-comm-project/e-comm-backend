const express = require("express");
const Order = require("../models/Order.model");
const router = express.Router();
const isAuthenticated = require("../middleware/jwt.middleware");

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
      next(err);
    });
});

module.exports = router;
