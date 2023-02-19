import Users from "../models/User.js";
import auth from "../config/firebase-config.js";

export async function createUser(req, res) {
  try {
    const userRecord = await auth.getUser(req.params.userId);
    const currUserName = userRecord.displayName
    await Users.create({
      score: 0,
      user: currUserName,
    });
    console.log("User has been added!");
    res.json({ Users });
  } catch (err) {
    console.log(err);
  }
}
export async function deleteUser(req, res) {
  try {
    console.log(req.body);
    // Find post by id - the following checks that it exists
    let chosenUser = await Users.findById({ _id: req.body._id });
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
    const allUsersInfo = await Users.find({});
    console.log(allUsersInfo);
    return res.json(allUsersInfo);
  } catch (err) {
    console.log(err);
  }
}