const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "dj", "user"],
    },
    phoneNumber: {
      type: String,
    },
    userName: {
      type: String,
    },
    firebaseUId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
