const express = require("express");
const nodemailer = require("nodemailer");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

router.post("/", fetchuser, async (req, res) => {
  try {
    const { title, items, tag, email } = req.body;
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "keepnotes.web@gmail.com",
        pass: "tjwrmexbgezcasag",
      },
    });
    transport.sendMail(
      {
        from: '"KeepNotes"<keepnotes.web@gmail.com>',
        to: email,
        subject: title,
        html: `Content of the note : ${items}<br/>Tags(s) associated with the note : ${tag}`,
      },
      (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

module.exports = router;
