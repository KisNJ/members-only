var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
/* GET home page. */
router.get("/", function (req, res, next) {
  async function run() {
    let user;
    if (req.isAuthenticated()) {
      user = await User.findById(req.user._id).populate("profile_picture");
    }
    const posts = await Post.find().populate({
      path: "author",
      populate: { path: "profile_picture" },
    });
    res.render("index", { title: "Posts", req, posts,user });
  }
  run();
});

module.exports = router;
