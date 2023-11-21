const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const Recipe = require('../modal/recipeModel');

const recipeResolvers = {
	Query: {
		recipes: async () => {
			return await Recipe.find();
		},
		recipe: async (_, { id }) => {
			return await Recipe.findById(id);
		},
	},
	Mutation: {
		createRecipe: async (_, { input }) => {
			const recipe = new Recipe(input);
			await recipe.save();
			return recipe;
		},
		updateRecipe: async (_, { id, input }) => {
			return await Recipe.findByIdAndUpdate(id, input, { new: true });
		},
		deleteRecipe: async (_, { id }) => {
			const result = await Recipe.findByIdAndDelete(id);
			return result !== null;
		},
	},
};
module.exports = recipeResolvers;
