const Profile_Picture = require("../models/profile_picture");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

function getSignUpPage(req, res) {
  async function run() {
    const pictures = await Profile_Picture.find();
    res.render("sign-up", { pictures });
  }
  run();
}
function signUpUser(req, res) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    async function run() {
      try {
        if (!mongoose.isValidObjectId(req.body.pictures))
          throw new Error("invalid profile picture");
        if (err) throw new Error("error occured during password generation");
        if (req.body.confirm_password !== req.body.password)
          throw new Error("password is not equal to confirmed password");
        await User.create({
          username: req.body.username,
          password: hashedPassword,
          profile_picture: req.body.pictures,
          status: "normal",
        });
        res.redirect("/");
      } catch (error) {
        res.render("error", {
          message:
            error.message || error.errors[Object.keys(error.errors)[0]].reason,
          error: { status: 400, stack: "Bad request" },
        });
      }
    }
    run();
  });
}

function getMemberPage(req,res){
  async function run(){
    try {
      if(!req.user) throw new Error("Sign in to become a member")
      res.render("becomeamember")
    } catch (error) {
      res.render("error",{
        message:
          error.message || error.errors[Object.keys(error.errors)[0]].reason,
        error: { status: 400, stack: "Bad request" },
      })
    }
  }
  
  run()
}



function becomeAMember(req,res){
  async function run(){
    try {
      if(!req.isAuthenticated()) throw new Error("Sign in to become a member!")
      if(req.body.memberPhrase===process.env.MEMBER_PHRASE){
        if(req.user.status!=="admin"){
          await User.findByIdAndUpdate(req.user.id,{$set:{status:"member"}},{runValidators:true})
        }
        res.redirect("/")
      }else{
        throw new Error("Member phrase is incorrect!")
      }
    } catch (error) {
      res.render("error",{
        message:
          error.message || error.errors[Object.keys(error.errors)[0]].reason,
        error: { status: 400, stack: "Bad request" },
      })
    }
  }
  
  run()
}
module.exports={
    getSignUpPage,
    signUpUser,
    getMemberPage,
    becomeAMember,
}