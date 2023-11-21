const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe', {
	title: String,
	description: String,
	rating: String,
	ingredients: [String],
	specialInstruction: String,
});

module.exports = Recipe;
