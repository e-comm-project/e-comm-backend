// user.routes.js
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

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

router.post(
  "/profile/upload",
  isAuthenticated,
  upload.single("image"),
  (req, res, next) => {
    const userId = req.payload._id; // Assuming you are storing user ID in the payload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    User.findByIdAndUpdate(userId, { image: imageUrl }, { new: true })
      .then((user) => {
        res.status(200).json({ image: user.image });
      })
      .catch((err) => {
        console.error("Error updating user with image", err);
        res.status(500).json({ message: "Error uploading image" });
      });
  }
);

module.exports = router;
