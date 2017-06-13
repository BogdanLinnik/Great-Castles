var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    app = express()

//requiring routes
var castleRoutes = require("./routes/castles"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index")

//Connectiong to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/castles_data');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

//seedDB(); //seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: 'To be or not to be',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use('/castles', castleRoutes);
app.use('/castles/:id/comments', commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Server has started');
});