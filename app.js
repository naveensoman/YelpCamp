var express = require("express"),
    app = express(),
    faker = require("faker"),
    bodyParser = require("body-parser"),
    mongoose =require("mongoose"),
    flash = require("connect-flash"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    localStrategy = require("passport-local"),
    User = require("./models/user");

//Requiring Routes   
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v13";
//mongoose.connect("mongodb://localhost/yelp_camp_v13");
// mongoose.connect("mongodb://naveensoman:naveen1510@ds123311.mlab.com:23311/yelpcampnaveen");
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Seed DataBase
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Vani is my wifey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middlware that adds currentUser and the flash message to all routes
app.use(function (req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Routes added for the Express Router. This is what enables the routes to be split
//into multiple files
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server is running"); 
});