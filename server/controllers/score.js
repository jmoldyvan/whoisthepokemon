const Score = require("../models/Score");
// const User = require("../models/User");

module.exports = {
  createScore: async (req, res) => {
    try {
      await Score.create({
        score: 0,
        user: req.body.user,
      });
      console.log("Score has been added!");
      res.json({Score}); 
    } catch (err) {
      console.log(err);
    }
  },
  // addLike: async (req,res)=>{
  // //like Score from specific post view
  //   try {
  //     //check if userid is in the array for that post, = already liked it
  //     let chosenScore = await Score.findOne(
  //       {_id: req.params.id, usersWhoLiked: req.user._id });
  //     if (chosenScore){
  //       await Score.findOneAndUpdate(
  //         { _id: req.params.id },
  //         {
  //           $inc: { likes: -1 },
  //           $pullAll: { 'usersWhoLiked': [req.user.id] } 
  //         }
  //       );
  //       console.log("Score Likes-1 and user from array");
  //       //back to the relevant post where the Score is shown
  //       res.json({msg: "Score Likes-1 and user from array"})
  //     } else {
  //       const addLikeScore = await Score.findOneAndUpdate(
  //         { _id: req.params.id },
  //         {
  //           $inc: { likes: 1 },
  //           $addToSet: { 'usersWhoLiked': req.user.id } 
  //         }
  //       );
  //       console.log("Likes +1");
  //     //back to the relevant post where the Score is shown
  //     res.json({msg: addLikeScore}); 
  //     }
      
  //   } catch (err) {
  //     console.log(err);
  //   }
  
  // },
  deleteScore: async (req, res) => {
    try {
      console.log(req.body);
      // Find post by id - the following checks that it exists
      let chosenScore = await Score.findById({ _id: req.body._id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await chosenScore.deleteOne({ _id: req.body._id });
      console.log("Deleted Score");
      res.json("Deleted Score");
    } catch (err) {
      res.json("error");
    }
  },    
  getScores: async (req,res)=>{
    try{
        const allScoresInfo = await Score.find({})
        console.log(allScoresInfo)  
        return res.json(allScoresInfo)          
    }catch(err){
        console.log(err)
    }
}
};