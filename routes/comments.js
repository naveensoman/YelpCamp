var express = require("express"),
//The mergeParams argument will merge the params from the campgrounds and the comments together
    router = express.Router({mergeParams: true});
    
var Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");


//NEW COMMENTS
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log("ERROORR");
        } else{
            res.render("comments/new",{campground:campground});
        }
    });
});

//CREATE ROUTE FOR COMMENT

router.post("/",middleware.isLoggedIn,function(req,res){
    //lookup campground by ID
   
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log("ERROORR!");
            res.redirect("/campgrounds");
        }else{
            //create new comment
            Comment.create(req.body.comment,function(err,comment){
               if(err){
                   req.flash("error","Something went wrong")
                   console.log("ERRRORR!");
               } else{
                   //Add username and ID to Comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //Save Comment
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   req.flash("success", "Successfully added a comment");
                   res.redirect("/campgrounds/"+req.params.id);
               }
            });
        }
    });
    
});

//Comments EDIT ROUTE

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
       if(err){
           res.redirect("back");
       } else{
           res.render("comments/edit",{campground_id:req.params.id, comment: foundComment});
       }
    });
});

//Comments UPDATE ROUTE

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
  }); 
});


//Comment Destroy Route

router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("back");
      } else{
          req.flash("success", "Comment Deleted");
          res.redirect("/campgrounds/"+req.params.id);
      }
    });

});

module.exports = router;