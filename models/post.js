const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Post=new Schema({
    author:{type:Schema.Types.ObjectId,ref:"User",required:true},
    content:{type:String,trim:true,required:true,minLength:1},
    created_at:{type:Date,required:true},
})

module.exports=mongoose.model("Post",Post)