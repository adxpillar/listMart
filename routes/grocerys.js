const express = require("express"),
	  router = express.Router({mergeParams: true}),
	  Mylist = require("./modles/mylist"),
	  Grocerys = require("../models/grocerys"),
	  middleware = require("../middleware");

// new item 
// GROCERY ROUTES 

router.get("/new", middleware.isLoggedIn, function(req, res){
// add to grocery under my list
	Mylist.findById(req.params.id, function(err, pickedList){
		if(err){
			console.log(err);
		} else{
			res.render("grocerys/new", {pickedList: pickedList});
		}
	});
});

// create
// add a grocery item to your list 
router.post("/", middleware.isLoggedIn, function(req, res){
	Mylist.findById(req.params.id, function(err, pickedList){
		if(err){
			console.log(err);
			res.redirect("/mylist");
		} else{
			Grocery.create(req.body.grocery, function(err, grocery){
				if(err){
					console.log(err);
				} else {
					// add username and id to grocery item
					grocery.author.id = req.user._id;
					grocery.author.username = req.user.username;
					//save grocery to list	
					pickedList.grocerys.push(grocery);
					pickedList.save();
					console.log(grocery);
					res.redirect("/mylist/" + pickedList._id);
				}
			});
		}
	});
});

// EDIT GROCERY ITEM ROUTE 

router.get("/:grocery_id/edit", middleware.checkGroceryOwnership, function(req, res){
	Mylist.findById(req.params.grocery_id, function(err, foundgrocery){
		if(err){
			res.redirect("back");
		} else{
			res.render("grocerys/edit", {mylist_id: req.params.id, grocery: foundgrocery});
		}
	});
});

// update grocery item route
router.put("/:grocery_id", middleware.checkGroceryOwnership, function(req, res){
	Mylist.findByIdAndUpdate(req.params.grocery_id, req.body.grocery, function(err, updatedGrocery){
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/mylist/" + req.params.id);
		}
	});
});

// destroy shopping list route
router.delete("/:grocery_id", middleware.checkGroceryOwnership, function(req, res){
	Mylist.findByIdAndRemove(req.params.grocery_id, function(err){
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/mylist/" + req.params.id);
		}
	});
});





module.exports = router;