// user.routes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/admin/users", isAuthenticated, (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/admin/users/:id", isAuthenticated, (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/admin/users", isAuthenticated, (req, res, next) => {
  const { email, password, name, role } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  User.create({ email, password: hashedPassword, name, role })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/admin/users/:id", isAuthenticated, (req, res, next) => {
  const id = req.params.id;
  const { email, name, role } = req.body;

  User.findByIdAndUpdate(id, { email, name, role }, { new: true })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/admin/users/:id", isAuthenticated, (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
