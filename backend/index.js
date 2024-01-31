require("dotenv").config();
const connecttoMongoDB = require("./database");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.BACKEND_PORT;

connecttoMongoDB();

app.use(cors());
app.use(express.json());
app.use("/api/user", require("./routes/user"));
app.use("/api/note", require("./routes/note"));
app.use("/api/mail", require("./routes/mail"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/blog", require("./routes/blog"));

app.listen(port, () => {
  console.log(`KeepNotes listening on localhost: ${port}.`);
});
