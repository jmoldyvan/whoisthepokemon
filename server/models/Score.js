const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Scores", ScoreSchema, "Scores");