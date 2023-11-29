const mongoose = require('mongoose');

// MongoDB User Interaction Schema
const userInteractionSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	ReciepeId: { type: String, required: true },
	description: { type: String, required: true },
	rating: { type: String },
	isReadCount: { type: Number },
	CreatedDate: { type: Date, required: true },
	UpdatedDate: { type: Date },
});

const UserInteractionModel = mongoose.model('UserInteraction', userInteractionSchema);

module.exports = {
	UserInteractionModel,
};
