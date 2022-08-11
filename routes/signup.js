const express = require("express");
const router = express.Router();

const controller=require("../controllers/signupController")

router.get("/",controller.getSignUpPage);
router.post("/",controller.signUpUser);

router.get("/becomeamember",controller.getMemberPage)
router.post("/becomeamember",controller.becomeAMember)
module.exports = router;
