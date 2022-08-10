const express = require("express");
const router = express.Router();
const Profile_Picture = require("../models/profile_picture");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
router.get("/", (req, res) => {
  async function run() {
    const pictures = await Profile_Picture.find();
    res.render("sign-up", { pictures });
  }
  run();
});
router.post("/", (req, res) => {
  // async function run(){

  // }
  // run()
  console.log(req.body);
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw new Error("error occured during password generation");
    async function run() {
      try {
        await User.create({
          username: req.body.username,
          password: hashedPassword,
        //   profile_picture:"work it out",
          status: "member",
        });
        res.redirect("/")
      } catch (error) {
        res.render("error",{message:error.errors[Object.keys(error.errors)[0]].reason,error:{status:400,stack:"Bad request"}})
      }
    }
    run();
  });
});

module.exports = router;
