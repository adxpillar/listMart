const express = require("express"),
	  router = express.Router(),
	  passport = require("passport"),
	  User = require("../models/user");

// root 
router.get("/", function(req, res){
	res.render('landing');
});

//  show register form 
router.get("/register", function(req, res){
	res.render("register");
});


// sign up logic
router.post("/register", function(req, res){
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/mylist");
		});
	});
});

// show login form 
router.get("/login", function(req, res){
	res.render("login");
});

//  handle login logic 
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/mylist",
		failureRedirect: "/login"
	}), function(req, res){
	
});

// logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

// middleware 
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();  
	}
	res.redirect("/login");
}

module.exports = router;
