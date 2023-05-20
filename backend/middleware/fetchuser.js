const jwt = require("jsonwebtoken");
const JWT_SECRET = "That is the secret";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ success: false, error: "Access Denied" });
    } else {
      req.user = decoded.user;
      next();
    }
  });
};

module.exports = fetchuser;
