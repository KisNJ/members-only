const Post = require("../models/post");

function createPost(req, res) {
  async function run() {
    try {
        if(!req.isAuthenticated()) throw new Error("Login to create posts!")
        await Post.create({
            author:req.user._id,
            content:req.body.content,
            created_at:new Date()
        })
        res.redirect("/")
    } catch (error) {
      res.render("error", {
        message:
          error.message || error.errors[Object.keys(error.errors)[0]].reason,
        error: { status: 400, stack: "Bad request" },
      });
    }
  }
  run();
}
module.exports = {
  createPost,
};
