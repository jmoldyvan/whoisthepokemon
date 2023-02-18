import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    ref: "User"
  }
});


const Users = mongoose.model("Users", UserSchema, "Users");
export default Users