const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Profile_Picture=new Schema({
    link:{type:String,required:true}
})

module.exports=mongoose.model("Profile_Picture",Profile_Picture)