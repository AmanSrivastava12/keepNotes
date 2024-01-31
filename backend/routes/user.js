const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "That is the secret";
const User = require("../mongooseModels/usersModel");
const fetchuser = require("../middleware/fetchuser");

router.post(
  "/register",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be of atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      let securedPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        email: req.body.email,
        password: securedPass,
        date: req.body.date,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken });
    } catch (err) {
      res.status(500).send({ success: false, error: err });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "User does not exist. Please register first",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid login credentials" });
      }
      if (req.header("User-Type") === "manager") {
        if (email !== "manager@gmail.com") {
          return res
            .status(400)
            .json({ success: false, error: "Invalid login credentials" });
        }
      } else if (req.header("User-Type") === "admin") {
        if (email !== "admin@gmail.com") {
          return res
            .status(400)
            .json({ success: false, error: "Invalid login credentials" });
        }
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken: authToken });
    } catch (err) {
      res.status(500).send({ success: false, error: err });
    }
  }
);

router.post("/myaccount", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ success: true, user: user });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

module.exports = router;
