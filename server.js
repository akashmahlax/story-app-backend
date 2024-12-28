const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/auth", require("./routes/auth"));
app.use("/story", require("./routes/story"));
app.use("/user", require("./routes/user"));

app.get("/", (req, res) => {
    res.send("hello server running")
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
