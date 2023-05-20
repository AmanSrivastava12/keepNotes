const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
    },
    items: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "General",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    colourDark: {
      type: String,
    },
    colourLight: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("note", NoteSchema);
