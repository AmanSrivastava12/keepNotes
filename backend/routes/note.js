const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../mongooseModels/notesModel");

router.post("/createNotes", fetchuser, async (req, res) => {
  try {
    const { title, items, tag, colourDark, colourLight } = req.body;
    const singlenote = new Note({
      title,
      items,
      tag,
      colourDark,
      colourLight,
      user: req.user.id,
    });
    const savedNote = await singlenote.save();
    res.json(savedNote);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/viewNotes", fetchuser, async (req, res) => {
  try {
    const allNotes = await Note.find({ user: req.user.id });
    res.json(allNotes);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateNotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, items, tag, colourDark, colourLight } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (items) {
      newNote.items = items;
    }
    if (tag) {
      newNote.tag = tag;
    }
    if (colourDark) {
      newNote.colourDark = colourDark;
    }
    if (colourLight) {
      newNote.colourLight = colourLight;
    }
    let singlenote = await Note.findById(req.params.id);
    if (!singlenote) {
      return res.status(404).send("Not found");
    }
    if (singlenote.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    singlenote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(singlenote);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteNotes/:id", fetchuser, async (req, res) => {
  try {
    let singlenote = await Note.findById(req.params.id);
    if (!singlenote) {
      return res.status(404).send({ success: false, error: "Not found" });
    }
    if (singlenote.user.toString() !== req.user.id) {
      return res.status(401).send({ success: false, error: "Not allowed" });
    }
    await Note.findByIdAndDelete(singlenote);
    res.json({
      success: true,
      message: "Note has been deleted",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
