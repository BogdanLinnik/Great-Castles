var express = require("express"),
    router = express.Router(),
    Castle = require("../models/castle"),
    middleware = require("../middleware/index.js")

//INDEX - show all castles
router.get('/', function(req, res) {
    Castle.find({}, function(err, allCastles) {
        if(err) {
            console.log("Error: " + err);
        } else {
            res.render('castles/index', {castles: allCastles, currentUser: req.user});
        }
    });
});

//NEW - form for creating new castle
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('castles/new');
});

//CREATE - add new castle to DB
router.post('/', middleware.isLoggedIn, function(req, res) {
   //get data from form and add to castles array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var location = req.body.location;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCastle = {name: name, image: image, description: desc, author: author, location: location};
   Castle.create(newCastle, function(err, castle) {
      if(err) {
          console.log('Error: ' + err);
      } else {
          console.log('New castle added to database');
          res.redirect('/castles');
      }
   });
   
   
});


//SHOW - shows detail page of particular castle
router.get('/:id', function(req, res) {
    Castle
    .findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundCastle) {
        if(err) {
            console.log(err);
        } else {
            res.render('castles/show', {castle: foundCastle});
        }
    });
    
});

//EDIT ROUTE
router.get('/:id/edit', middleware.checkCastleOwnership, function(req, res) {
   Castle.findById(req.params.id, function(err, foundCastle) {
      res.render('castles/edit', {castle: foundCastle}); 
   });
});    
   

//UPDATE ROUTE
router.put('/:id', middleware.checkCastleOwnership, function(req, res) {
   //find and update the correct castle
   Castle.findByIdAndUpdate(req.params.id, req.body.castle, function(err, updatedCastle) {
       if(err) {
           res.redirect('/castles');
       } else {
           res.redirect('/castles/' + req.params.id);
       }
   })
});

//DESTROY ROUTE
router.delete('/:id', middleware.checkCastleOwnership, function(req, res) {
   Castle.findByIdAndRemove(req.params.id, function(err, deletedCastle) {
       if(err) {
           res.redirect('/castles');
       } else {
           res.redirect('/castles'); 
       }
   });   
});


module.exports = router;