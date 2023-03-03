const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Users", UserSchema, "Users");