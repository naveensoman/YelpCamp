var express = require("express"),
    router = express.Router();
    
var passport = require("passport");
    
var User = require("../models/user");
//ROUTES

//Root Route
router.get("/", function(req,res){
    res.render("landing");
});

//Show Register Form route
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//Route to handle sign up logic

router.post("/register",function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to Yelp Camp, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

//Show Login Form

router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//Login Logic
router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    successFlash: "Welcome Back!",
    failureFlash: true
}));

//Logout Stuff

router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;