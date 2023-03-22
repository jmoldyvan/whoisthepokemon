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
export async function getUserHighScore(req, res) {
  try {
    const userRecord = await auth.getUser(req.user.uid);
    const userUid = userRecord.uid
    const userInfo = await Users.find({ uid: userUid });
    return res.json(userInfo[0].highScore);
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
    if(userObj[0].score > userObj[0].highScore){
        const userInfo = await Users.findOneAndUpdate(
      { uid: userUid },
      { highScore: userObj[0].score}
      );
      return res.json(userInfo);
    }
  } catch (err) {
    console.log(err);
  }
}
export async function getAllHighScore(req, res) {
  try {
    const userInfo = await Users.find({  }).sort({highScore:-1}).limit(10);
    let onlyHSandUserName = userInfo.map((x) => {
      return {highScore:x.highScore, user:x.user}
    })
    console.log(onlyHSandUserName);
    return res.json(userInfo);
  } catch (err) {
    console.log(err);
  }
}





// export async function checkUserName(req, res) {
//   try {
//     console.log(req);
//     let userObj = await Users.find({ user: req });
//     if(userObj){
//       return res.json("username already exists");
//     }
//     else{
//       res.json("good to go")
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }