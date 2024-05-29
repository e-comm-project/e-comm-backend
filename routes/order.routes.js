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

module.exports = router;
