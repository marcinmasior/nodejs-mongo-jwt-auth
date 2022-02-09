const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
