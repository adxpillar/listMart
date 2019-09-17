const Mylist = require("../models/mylist");
const Grocery = require("../models/grocery");

// all middlware goes in this obj
const middlewareObj = {};

middlewareObj.checkListOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Mylist.findById(req.params.id, function(err, foundList){
			if(err){
				res.redirect("back");
			} else {
			// 	does user own the shopping list?
				if(foundList.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else{
		res.redirect("back");
	}
}

middlewareObj.checkGroceryOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Grocery.findById(req.params.grocery_id, function(err, foundGrocery){
			if(err){
				res.redirect("back");
			} else {
			// 	did the user add this grocery under her list?
				if(foundGrocery.author.id.equals(req.user._id)) {
					next();
				} else{
					res.redirect("back");
				}
			}
		});
	} else{
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewareObj;