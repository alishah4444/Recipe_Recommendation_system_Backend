const { UserInteractionModel } = require('../modal/DataCollectionModel');

const resolvers = {
	Mutation: {
		insertUserInteract: async (_, { input }) => {
			try {
				const newUserInteract = new UserInteractionModel({
					userId: input.userId,
					ReciepeId: input.ReciepeId,
					description: input.description,
					rating: input.rating,
					isReadCount: input.isReadCount,
					CreatedDate: new Date(input.CreatedDate),
					UpdatedDate: input.UpdatedDate ? new Date(input.UpdatedDate) : null,
				});

				const result = await newUserInteract.save();
				return result;
			} catch (error) {
				console.error('Error inserting user interaction:', error);
				throw error;
			}
		},
	},
};

module.exports = resolvers;
