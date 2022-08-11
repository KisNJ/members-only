const express = require("express");
const router = express.Router();

router.get("/", (req, res,next) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }else{
    res.redirect("/")
  }
});

module.exports = router;
