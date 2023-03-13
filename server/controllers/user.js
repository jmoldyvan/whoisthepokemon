import Users from "../models/User.js";
import auth from "../config/firebase-config.js";

export async function createUser(req, res) {
  try {
    const userRecord = await auth.getUser(req.user.uid);
    const currUserName = userRecord.displayName
    const userUid = userRecord.uid
    await Users.create({
      highScore: 0,
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
    // Find post by id - the following checks that it exists
    let chosenUser = await Users.findById({ _id: req.body._id });
    await chosenUser.deleteOne({ _id: req.body._id });
    console.log("Deleted User");
    res.json("Deleted User");
  } catch (err) {
    res.json("error");
  }
}
export async function getUserScore(req, res) {
  try {
    const userRecord = await auth.getUser(req.user.uid);
    const userUid = userRecord.uid
    const userInfo = await Users.find({ score: userUid });
    // console.log(userInfo);
    return res.json(userInfo.score);
  } catch (err) {
    console.log(err);
  }
}

export async function updateScore(req, res) {
  try {
    const userRecord = await auth.getUser(req.user.uid);
    const userUid = userRecord.uid
    const userInfo = await Users.findOneAndUpdate(
      { uid: userUid },
      { score: req.body.score}
      );
          console.log(userInfo);
    return res.json(userInfo);
  } catch (err) {
    console.log(err);
  }
}
export async function updateHighScore(req, res) {
  try {

    const userRecord = await auth.getUser(req.user.uid);
    const userUid = userRecord.uid
    let userObj = await Users.find({ uid: userUid });
    console.log(`${userObj} score`);
    if(userObj.score > userObj.highScore){
        const userInfo = await Users.findOneAndUpdate(
      { uid: userUid },
      { highScore: req.body.score}
      );
      return res.json(userInfo);
    }
  } catch (err) {
    console.log(err);
  }
}