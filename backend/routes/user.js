const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../mongooseModels/usersModel");
const Token = require("../mongooseModels/tokenModel");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();
let passwordReset;

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
      res.json({ success: true });
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
      if (req.header("User-Type") === "administrator") {
        if (
          email !== process.env.REACT_APP_MANAGER_EMAIL &&
          email !== process.env.REACT_APP_ADMIN_EMAIL
        ) {
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
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ success: true, authToken: authToken });
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
      let tokenData = crypto.randomBytes(32).toString("hex");
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(tokenData, Number(salt));
      let tokenExists = await Token.findOne({ userId: data.user.id });
      if (tokenExists) {
        await Token.deleteOne({ userId: data.user.id });
      }
      await new Token({
        userId: data.user.id,
        key: hash.toString(),
        createdAt: new Date(),
      }).save();
      const link = `${process.env.FRONTEND_HOST}/passwordReset?key=${hash}&id=${data.user.id}`;
      passwordReset = true;
      res.json({
        success: true,
        email: email,
        resetLink: link,
        name: name.name,
      });
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
    const { resetKey, id, password } = req.body;
    let currentDate = new Date();
    currentDate = new Date(currentDate.getTime() + 15 * 60000);
    try {
      if (passwordReset) {
        let token = await Token.findOne({ userId: id });
        expiryDate = new Date(token.createdAt.getTime() + 15 * 60000);
        timeDiff = (currentDate - expiryDate) / 60000;
        if (timeDiff <= 15) {
          if (token.key === resetKey) {
            const salt = await bcrypt.genSalt(10);
            let securedPass = await bcrypt.hash(password, salt);
            await User.findByIdAndUpdate(
              id,
              { password: securedPass },
              { new: true }
            );
            passwordReset = false;
            res.json({ success: true });
          } else {
            res.json({ success: false, error: "Invalid User" });
          }
        } else {
          res.json({ success: false, error: "The reset link has expired" });
        }
      } else {
        res.json({
          success: false,
          error: "The reset link has already been used once",
        });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }
);

module.exports = router;
