const express = require("express"),
	  router = express.Router(),
	  Mylist = require("..models/mylist"),
	  middleware = require("../middleware");
	  

// INDEX - show all lists
router.get("/", function(req, res){
// 	Get all items from DB 
	Mylist.find({}, function(err, allLists){
		if(err){
			console.log(err);
		} else{
			res.render("mylist/index", {allLists: allLists});
		}
	});
});

// CREATE - add new list to DB
router.post("/", middleware.isLoggedIn, function(req, res){
// 	To get data from form and add to items array 
	const name = req.body.name;
	const image = req.body.image;
	const descprition = req.body.description;
	const total = req.body.total;
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	const newList = {name: name, image: image, description: description, total: total, author: author}
// 	 create new item and save to DB 
	Mylist.create(newList, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/mylist");
		}
	});
});

// NEW - show form to create new shopping list 
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("mylist/new");
});

// SHOW - show list by id, including description
router.get("/:id", middleware.isLoggedIn, function(req, res){
	Mylist.findById(req.params.id).populate("grocerys").exec(function(err, foundList){
		if(err){
			console.log(err);
		} else{
			console.log(foundList);
			res.render("mylist/show", {shopperList: foundList});
		}
	});
});



// EDIT SHOPPING LIST ROUTE 

router.get("/:id/edit", middleware.checkListOwnership, function(req, res){
	Mylist.findById(req.params.id, function(err, foundList){
		if(err){
			res.redirect("/mylist");
		} else{
			res.render("mylist/edit", {foundList: foundList});
		}
	});
});

// update shopping list route
router.put("/:id", middleware.checkListOwnership, function(req, res){
	Mylist.findByIdAndUpdate(req.params.id, req.body.mylist, function(err, foundList){
		if(err){
			res.redirect("/mylist");
		} else{
			res.redirect("/mylist/" + req.params.id);
		}
	});
});

// destroy shopping list route
router.delete("/:id", middleware.checkListOwnership, function(req, res){
	Mylist.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/mylist");
		} else{
			res.redirect("/mylist");
		}
	});
});


module.exports = router;
