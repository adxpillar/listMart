const mongoose = require("mongoose");

const grocerySchema = mongoose.Schema ({
	item: String,
	image: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Grocery", grocerySchema);