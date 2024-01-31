const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Blog = require("../mongooseModels/blogModel");

router.post("/createBlog", fetchuser, async (req, res) => {
  try {
    const { title, items, ttr } = req.body;
    const singleblog = new Blog({
      title,
      items,
      ttr,
      user: req.user.id,
    });
    const savedBlog = await singleblog.save();
    res.json(savedBlog);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/viewBlogs", fetchuser, async (req, res) => {
  try {
    const allBlogs = await Blog.find({ user: req.user.id });
    res.json(allBlogs);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/viewOneBlog/:id", fetchuser, async (req, res) => {
  try {
    const oneBlog = await Blog.findById(req.params.id);
    res.json(oneBlog);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateBlogs/:id", fetchuser, async (req, res) => {
  try {
    const { title, items } = req.body;
    const newBlog = {};
    if (title) {
      newBlog.title = title;
    }
    if (items) {
      newBlog.items = items;
    }
    let singleblog = await Blog.findById(req.params.id);
    if (!singleblog) {
      return res.status(404).send("Not found");
    }
    if (singleblog.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    singleblog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: newBlog },
      { new: true }
    );
    res.json(singleblog);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteBlogs/:id", fetchuser, async (req, res) => {
  try {
    let singleblog = await Blog.findById(req.params.id);
    if (!singleblog) {
      return res.status(404).send({ success: false, error: "Not found" });
    }
    if (singleblog.user.toString() !== req.user.id) {
      return res.status(401).send({ success: false, error: "Not allowed" });
    }
    await Blog.findByIdAndDelete(singleblog);
    res.json({
      success: true,
      message: "Note has been deleted",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
