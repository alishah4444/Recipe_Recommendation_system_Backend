const userModal = require('../modal/userModal');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const resolvers = {
	Query: {
		users: async () => await userModal.find(),
		user: (parent, { id }) => userModal.findById(id),
	},
	Mutation: {
		createUser: async (parent, { input }) => {
			const newUser = new userModal(input);

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

		loginUser: async (parent, input) => {
			const { email, password } = input;

			const userData = await userModal.findOne({ email: email });
			console.log(userData);
			if (userData != null) {
				if (userData.password == password) {
					const token = jwt.sign({ username: input }, SECRET_KEY);
					userData.refreshToken = token;
					return userData;
				} else {
					return { user: null };
				}
			} else {
				return { user: null };
			}
		},
	},
};

module.exports = resolvers;
