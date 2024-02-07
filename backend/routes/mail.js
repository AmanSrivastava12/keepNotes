const express = require("express");
const nodemailer = require("nodemailer");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
require("dotenv").config();

router.post("/sendNotes", fetchuser, async (req, res) => {
  try {
    const { title, items, tag, email } = req.body;
    var transport = nodemailer.createTransport({
      host: `${process.env.EMAIL_HOST}`,
      port: 587,
      auth: {
        user: `${process.env.FROM_EMAIL}`,
        pass: `${process.env.FROM_PASSWORD}`,
      },
    });
    transport.sendMail(
      {
        from: `"KeepNotes"<${process.env.FROM_EMAIL}>`,
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

router.post("/sendPassResetRequest", async (req, res) => {
  try {
    const { email, link, name } = req.body;
    var transport = nodemailer.createTransport({
      host: `${process.env.EMAIL_HOST}`,
      port: 587,
      auth: {
        user: `${process.env.FROM_EMAIL}`,
        pass: `${process.env.FROM_PASSWORD}`,
      },
    });

    transport.sendMail(
      {
        from: `"KeepNotes"<${process.env.FROM_EMAIL}>`,
        to: email,
        subject: "Password Reset Request",
        html: `<body>
        <p>Hi ${name},<br>You requested to reset your password.<br>Please click the link below to reset your password.<br>The link will expire in 15 minutes.</p>
        <a href="${link}">Reset Password Link</a>
        </body>`,
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
