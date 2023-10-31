const userModal = require('../modal/userModal');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const resolvers = {
	Query: {
		users: () => employees,
		user: (parent, { id }) => employees.find((employee) => employee.id === id),
	},
	Mutation: {
		createUser: async (parent, { input }) => {
			const newUser = new userModal(input);
			console.log(newUser);

			const token = jwt.sign({ username: input }, SECRET_KEY);

			newUser.refreshToken = token;
			const savedUser = await newUser.save();

			console.log(savedUser);
			return savedUser;
		},
		updateUser: (parent, { id, input }) => {
			const index = employees.findIndex((employee) => employee.id === id);
			if (index !== -1) {
				employees[index] = { ...employees[index], ...input };
				return employees[index];
			}
			return null;
		},
		deleteUser: (parent, { id }) => {
			const index = employees.findIndex((employee) => employee.id === id);
			if (index !== -1) {
				employees.splice(index, 1);
				return true;
			}
			return false;
		},

		loginUser: (parent, args) => {
			const token = jwt.sign({ username: args.username }, SECRET_KEY);
			return token;
		},
	},
};

module.exports = resolvers;
