import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

export default model("Users", UserSchema, "Users");