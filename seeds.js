var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm2.staticflickr.com/1223/5167777670_60d87a3a26.jpg",
        description: "Bacon ipsum dolor amet sausage short ribs beef fatback turducken salami pork tongue. Kevin capicola ground round, ham alcatra meatball shank pork chop pancetta beef ribs beef doner. Tail turducken shankle tongue, turkey salami landjaeger andouille pancetta kielbasa ham beef ribs sirloin chicken. Fatback swine chuck, pork belly beef alcatra short loin pastrami strip steak landjaeger turkey chicken flank shankle. Strip steak sausage jerky porchetta beef ribs picanha bresaola, brisket ham hock ground round pork belly beef tri-tip. Short ribs biltong brisket ham tail kevin corned beef short loin, kielbasa rump shank beef chuck shankle picanha. Andouille jerky pork, landjaeger kevin rump short loin pastrami sirloin."
    },
    {
        name: "Horizon Grounds",
        image: "https://farm3.staticflickr.com/2815/9659585454_afb46d2ab6.jpg",
        description: "Bacon ipsum dolor amet sausage short ribs beef fatback turducken salami pork tongue. Kevin capicola ground round, ham alcatra meatball shank pork chop pancetta beef ribs beef doner. Tail turducken shankle tongue, turkey salami landjaeger andouille pancetta kielbasa ham beef ribs sirloin chicken. Fatback swine chuck, pork belly beef alcatra short loin pastrami strip steak landjaeger turkey chicken flank shankle. Strip steak sausage jerky porchetta beef ribs picanha bresaola, brisket ham hock ground round pork belly beef tri-tip. Short ribs biltong brisket ham tail kevin corned beef short loin, kielbasa rump shank beef chuck shankle picanha. Andouille jerky pork, landjaeger kevin rump short loin pastrami sirloin."
    },
    {
        name: "Nexus Farms",
        image: "https://farm8.staticflickr.com/7172/6809587893_6b202c6087.jpg",
        description: "Bacon ipsum dolor amet sausage short ribs beef fatback turducken salami pork tongue. Kevin capicola ground round, ham alcatra meatball shank pork chop pancetta beef ribs beef doner. Tail turducken shankle tongue, turkey salami landjaeger andouille pancetta kielbasa ham beef ribs sirloin chicken. Fatback swine chuck, pork belly beef alcatra short loin pastrami strip steak landjaeger turkey chicken flank shankle. Strip steak sausage jerky porchetta beef ribs picanha bresaola, brisket ham hock ground round pork belly beef tri-tip. Short ribs biltong brisket ham tail kevin corned beef short loin, kielbasa rump shank beef chuck shankle picanha. Andouille jerky pork, landjaeger kevin rump short loin pastrami sirloin."
    }];
function seedDB(){
    // Remove all Campground
    Campground.remove({},function(err){
   if(err){
       console.log(err);
   }
       console.log("Removed Campgrounds!!!");
       // add a few campgrounds
        data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
        if(err){
            console.log("ERRROORR!");
        } else{
            console.log("Added a Campground!");
            //create a Comment for each campground
            Comment.create({
                text:"This place is epic! Wish I could have stayed longer.",
                author:"Homer Simpson"
            },function(err,comment){
               if(err){
                   console.log("ERRORR!!!");
               }else{
                   campground.comments.push(comment);
                   campground.save();
                   console.log("Created new comment");
               }
            });
        }
    });
});
});


//add a few comments


}

module.exports = seedDB;
