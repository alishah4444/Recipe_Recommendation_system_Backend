const employees = [
	{
		id: '1',
		username: 'John',
		email: 'John@example.com',
		password: 'Admin@12',
		phoneNo: '2235655545',
		loginType: 2,
		refreshToken: '123456sasfsfsf',
	},
	{
		id: '2',
		username: 'jane',
		email: 'Jane@example.com',
		password: 'Admin@12',
		phoneNo: '21368258221',
		loginType: 2,
		refreshToken: '15482165423851855',
	},
	// Add more dummy employees as needed
];

const resolvers = {
	Query: {
		users: () => employees,
		user: (parent, { id }) => employees.find((employee) => employee.id === id),
	},
	Mutation: {
		createUser: (parent, { input }) => {
			const newEmployee = { id: String(employees.length + 1), ...input };
			employees.push(newEmployee);
			return newEmployee;
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
	},
};

module.exports = resolvers;
