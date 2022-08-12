const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile_Picture = require("../models/profile_picture");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

router.get("/", (req, res) => {
  res.render("login",{title:"Login"});
});

router.post(
  "/",
  passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login" })
);

module.exports=router