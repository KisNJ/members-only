var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bcrypt=require("bcryptjs")
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require("./models/user")
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let signUpRouter = require("./routes/signup");
let logInRouter=require("./routes/login")
let logOutRouter=require("./routes/logout")
let createPostRouter=require("./routes/createpost")
var app = express();
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
passport.use(new LocalStrategy((username,password,done)=>{
  User.findOne({username:username},(err,user)=>{
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    bcrypt.compare(password,user.password,(err,res)=>{
      if(res){
        done(null,user)
      }else{
        done(null,false,{message:"Incorrect password"})
      }
    })
  })
}))
passport.serializeUser(function(user,done){
  done(null,user.id)
})
passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    done(err,user)
  })
})
app.use(passport.initialize());
app.use(passport.session());



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/signup", signUpRouter);
app.use("/login",logInRouter)
app.use("/logout",logOutRouter)
app.use("/createpost",createPostRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
