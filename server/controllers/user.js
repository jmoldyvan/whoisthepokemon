import { create, findById, find } from "../models/User.js";
// const User = require("../models/User");

export async function createUser(req, res) {
  try {
    await create({
      User: 0,
      user: req.body.user,
    });
    console.log("User has been added!");
    res.json({ User });
  } catch (err) {
    console.log(err);
  }
}
export async function deleteUser(req, res) {
  try {
    console.log(req.body);
    // Find post by id - the following checks that it exists
    let chosenUser = await findById({ _id: req.body._id });
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(post.cloudinaryId);
    // Delete post from db
    await chosenUser.deleteOne({ _id: req.body._id });
    console.log("Deleted User");
    res.json("Deleted User");
  } catch (err) {
    res.json("error");
  }
}
export async function getUsers(req, res) {
  try {
    const allUsersInfo = await find({});
    console.log(allUsersInfo);
    return res.json(allUsersInfo);
  } catch (err) {
    console.log(err);
  }
}