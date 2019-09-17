const  express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
	  ejsLint = require("ejs-lint"),
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local"),
	  methodOverride = require("method-override"),
	  Mylist = require("./models/mylist"),
	  Grocery = require("./models/grocery"),
	  User = require("./models/user"),
	  seedDB = require("./seeds");

// routes 
const mylistRoutes = require("./routes/mylist"),
	  grocerysRoutes = require("./routes/grocerys"),
	  indexRoutes = require("./routes/index");
	  

// IN ORDER TO SHARE CODE OR SAVE LOCAL URL SHOULD IN CASE IT GOES MISSING, WE CAN DO:
const url = process.env.DATABASEURL || "mongodb://localhost/listy_mart";
mongoose.connect(url, { useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "xxxxxx",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser);

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/mylist", mylistRoutes);
app.use("/mylist/:id/grocerys", grocerysRoutes);

//  Landing page - show all items 
// app.get("/shop", function(req, res){
// // 	Get all items from DB 
// 	Item.find({}, function(err, allItems){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			res.render('index',{items: allItems});
// 		}
// 	});
// });


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The Server Has Started!");
});