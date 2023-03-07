import Users from "../models/User.js";
import auth from "../config/firebase-config.js";

export async function createUser(req, res) {
  try {
    const userRecord = await auth.getUser(req.user.uid);
    const currUserName = userRecord.displayName
    const userUid = userRecord.uid
    await Users.create({
      score: 0,
      user: currUserName,
      uid: userUid
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
    await chosenUser.deleteOne({ _id: req.body._id });
    console.log("Deleted User");
    res.json("Deleted User");
  } catch (err) {
    res.json("error");
  }
}
export async function getUser(req, res) {
  try {
    const userRecord = await auth.getUser(req.user.uid);
    const userUid = userRecord.uid
    const userInfo = await Users.find({ uid: userUid });
    console.log(userInfo);
    return res.json(userInfo);
  } catch (err) {
    console.log(err);
  }
}