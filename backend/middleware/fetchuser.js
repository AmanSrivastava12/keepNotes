require("dotenv").config();
const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ success: false, error: "Access Denied" });
    } else {
      req.user = decoded.user;
      next();
    }
  });
};

module.exports = fetchuser;
