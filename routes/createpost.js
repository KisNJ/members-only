const express=require("express")
const router=express.Router()
const controller=require("../controllers/createpostController")
router.post("/",controller.createPost)

module.exports=router