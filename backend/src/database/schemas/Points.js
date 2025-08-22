const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  points: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Points = mongoose.model("Points", pointSchema);
module.exports = Points;
