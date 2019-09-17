const mongoose = require("mongoose");
	  

const mylistSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	total: Number,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	grocerys: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Grocery"
		}
	]
});

module.exports  = new mongoose.model("Mylist", mylistSchema);

