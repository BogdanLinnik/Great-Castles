var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    passport = require("passport")

//root route
router.get('/',function(req, res) {
    res.render('landing');
});


//show register form
router.get('/register', function(req, res) {
   res.render('register'); 
});

//handle sign up logic
router.post('/register', function(req, res) {
   User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
       if(err) {
           req.flash('error', err.message);
           return res.render('register');
       }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'Welcome ' + user.username);
            res.redirect('/castles');
       });
   });
});

//show login form 
router.get('/login', function(req, res) {
    res.render('login');
});

//handling login logic
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/castles',
        failureRedirect: '/login'
    }), function(req, res) {
    
});

//logout route
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'Loged you out!');
    res.redirect('/castles');
});


module.exports = router;