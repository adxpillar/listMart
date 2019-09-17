let	  mongoose = require("mongoose"),
	  Mylist = require("./models/mylist"),
	  Grocery = require("./models/grocery");
	    
	  
let data = [
	{
		name: "salmon for dinner",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNlvv2G-eDtUoSh3456j7Ndni_q2v0eDU_dc_W5GjpulOB7dV",
		description: "Wild salmon",
		total: 2
	},
	
	{
		name: "salmon for dinner",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNlvv2G-eDtUoSh3456j7Ndni_q2v0eDU_dc_W5GjpulOB7dV",
		description: "Wild salmon",
		total: 2
	},
	
	{
		name: "salmon for dinner",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNlvv2G-eDtUoSh3456j7Ndni_q2v0eDU_dc_W5GjpulOB7dV",
		description: "Wild salmon",
		total: 2
	},
	
	{
		name: "salmon for dinner",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbNlvv2G-eDtUoSh3456j7Ndni_q2v0eDU_dc_W5GjpulOB7dV",
		description: "Wild salmon",
		total: 2
	}
]

function seedDB(){
	
// 	Remove all lists
	Mylist.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} 
		console.log("removed all shopping lists!");
		
// 	add a few lists 
		data.forEach(function(seed){
			Mylist.create(seed, function(err, shopperList){
				if(err){
					console.log(err);
				} else{
					console.log("added a new list!");
					Grocery.create(
						{
						item: "Milk",
						image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkJiL5KluoIqyL-00Hw6EolB1FCasXqnB1nYQi2LOxe38UhwYC",
						author: "Yinks"
					}, function(err, grocery){
							if(err){
								console.log(err);
							} else {
							shopperList.grocerys.push(grocery);
							shopperList.save();
							console.log("Created new grocery");
						}
					});
				}
			});
		});
	});	
}

module.exports = seedDB;