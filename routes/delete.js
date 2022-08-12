const express = require("express");
const handleError = require("../handleError");
const router = express.Router();
const Post = require("../models/post");
router.post("/:id", (req, res) => {
  async function run() {
    try {
        console.log(req.params)
        if(!req.isAuthenticated()) throw new Error("Sign in to see if you are an admin")
        if (req.user.status!=="admin") throw new Error("You are not an admin")
        await Post.deleteOne({_id:req.params.id})
        res.redirect("/")
    } catch (error) {
        handleError(error,res)
    }
  }
  run();
});

module.exports = router;
