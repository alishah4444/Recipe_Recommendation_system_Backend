const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ingredientSchema = new Schema({
	name: String,
	qty: String,
});

const Recipe = mongoose.model('Recipe', {
	title: String,
	description: String,
	rating: String,
	imageUrl: String,
	ingredients: [ingredientSchema],
	specialInstruction: String,
	userId: String,
	cookTime: String,
	servings: String,
});

module.exports = Recipe;
