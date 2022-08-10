const mongoose= require("mongoose")
const Schema=mongoose.Schema

const User=new Schema({
    username:{type:String,required:true,trim:true,maxLength:20,unique:true},
    password:{type:String,required:true},
    status:{type:String,required:true,enum:["normal","member","admin"]},
    // profile_picture:{type:Schema.Types.ObjectId,required:true,ref:"Profile_Picture"}
})

module.exports=mongoose.model("User",User)