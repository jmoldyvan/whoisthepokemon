const User = require("../models/User");
// const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    try {
      await User.create({
        User: 0,
        user: req.body.user,
      });
      console.log("User has been added!");
      res.json({User}); 
    } catch (err) {
      console.log(err);
    }
  },
  // addLike: async (req,res)=>{
  // //like User from specific post view
  //   try {
  //     //check if userid is in the array for that post, = already liked it
  //     let chosenUser = await User.findOne(
  //       {_id: req.params.id, usersWhoLiked: req.user._id });
  //     if (chosenUser){
  //       await User.findOneAndUpdate(
  //         { _id: req.params.id },
  //         {
  //           $inc: { likes: -1 },
  //           $pullAll: { 'usersWhoLiked': [req.user.id] } 
  //         }
  //       );
  //       console.log("User Likes-1 and user from array");
  //       //back to the relevant post where the User is shown
  //       res.json({msg: "User Likes-1 and user from array"})
  //     } else {
  //       const addLikeUser = await User.findOneAndUpdate(
  //         { _id: req.params.id },
  //         {
  //           $inc: { likes: 1 },
  //           $addToSet: { 'usersWhoLiked': req.user.id } 
  //         }
  //       );
  //       console.log("Likes +1");
  //     //back to the relevant post where the User is shown
  //     res.json({msg: addLikeUser}); 
  //     }
      
  //   } catch (err) {
  //     console.log(err);
  //   }
  
  // },
  deleteUser: async (req, res) => {
    try {
      console.log(req.body);
      // Find post by id - the following checks that it exists
      let chosenUser = await User.findById({ _id: req.body._id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await chosenUser.deleteOne({ _id: req.body._id });
      console.log("Deleted User");
      res.json("Deleted User");
    } catch (err) {
      res.json("error");
    }
  },    
  getUsers: async (req,res)=>{
    try{
        const allUsersInfo = await User.find({})
        console.log(allUsersInfo)  
        return res.json(allUsersInfo)          
    }catch(err){
        console.log(err)
    }
}
};