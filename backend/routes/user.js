const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../mongooseModels/usersModel");
const Token = require("../mongooseModels/tokenModel");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();

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
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      let singleToken = new Token({
        userId: data.user.id,
        authToken: authToken.toString(),
        createdAt: Date.now(),
      });
      await singleToken.save();
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
        if (email !== process.env.REACT_APP_MANAGER_EMAIL) {
          return res
            .status(400)
            .json({ success: false, error: "Invalid login credentials" });
        }
      } else if (req.header("User-Type") === "admin") {
        if (email !== process.env.REACT_APP_ADMIN_EMAIL) {
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
      const singleToken = await Token.findOne({ userId: data.user.id });
      res.json({ success: true, authToken: singleToken.authToken });
    } catch (err) {
      res.status(500).send({ success: false, error: err });
    }
  }
);

router.post("/myAccount", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ success: true, user: user });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

router.post("/verifyUser", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const name = await User.findById(data.user.id).select("name");
      let singleToken = await Token.findOne({ userId: data.user.id });
      if (singleToken) {
        await Token.deleteOne({ userId: data.user.id });
        let newToken = jwt.sign(data, process.env.JWT_SECRET);
        singleToken = new Token({
          userId: data.user.id,
          authToken: newToken.toString(),
          createdAt: Date.now(),
        });
        await singleToken.save();
        const link = `${process.env.FRONTEND_HOST}/passwordReset?token=${newToken}&id=${data.user.id}`;
        res.json({
          success: true,
          email: email,
          resetLink: link,
          name: name.name,
        });
      } else {
        res.json({ success: false, error: "Authtoken not found" });
      }
    } else {
      res.json({ success: false, error: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

router.put(
  "/resetPass",
  [
    body("password", "Passwords must be of atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { id, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      let securedPass = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(
        id,
        { password: securedPass },
        { new: true }
      );
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }
);

module.exports = router;
