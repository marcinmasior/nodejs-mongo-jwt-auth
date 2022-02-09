const express = require("express");
const app = express();
const connectDB = require("./utils/dbConnection");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth.routes"));

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server working on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
