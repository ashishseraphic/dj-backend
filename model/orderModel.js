const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    djId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    video:{
      type:String
    },
    voiceMessage:{
      type:String
    },
    songName: {
      type: String,
    },
    status:{
      type: String,
      enum: ["approve", "reject", "pending"],
      default:"pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
