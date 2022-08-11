var express = require('express');
var router = express.Router();
const Post=require("../models/post")
/* GET home page. */
router.get('/', function(req, res, next) {
  async function run(){
    const posts=await Post.find()
    res.render('index', { title: 'Posts',req,posts });
  }
  run()
});

module.exports = router;
