require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const User = require("../mongooseModels/usersModel");
const Note = require("../mongooseModels/notesModel");

router.delete("/deleteUsers/:id", fetchuser, async (req, res) => {
  try {
    let singleUser = await User.findById(req.params.id);
    if (!singleUser) {
      return res.status(404).send({ success: false, error: "User not found" });
    }
    await Note.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(singleUser);
    res.json({
      success: true,
      message: "User has been deleted",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateUsers/:id", fetchuser, async (req, res) => {
  try {
    const { name, age, gender, contact, email } = req.body;
    const newUser = {};
    newUser.name = name ? name : "";
    newUser.age = age ? age : "";
    newUser.gender = gender ? gender : "";
    newUser.contact = contact ? contact : "";
    let user = await User.findOne({
      email: req.body.email,
      _id: { $ne: req.params.id },
    });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "Updated email already exists" });
    } else {
      newUser.email = email;
    }
    let singleUser = await User.findById(req.params.id);
    if (!singleUser) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exists" });
    }
    singleUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json(singleUser);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/viewUsers", fetchuser, async (req, res) => {
  try {
    const users = await User.find({ age: { $exists: true } }).select(
      "-password"
    );
    allUsers = users.filter(
      (user) =>
        user.email !== process.env.REACT_APP_MANAGER_EMAIL &&
        user.email !== process.env.REACT_APP_ADMIN_EMAIL
    );
    res.json({ users: allUsers, success: true });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
