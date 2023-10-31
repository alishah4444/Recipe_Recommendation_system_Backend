'use strict';
require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const databaseURL = process.env.DATABASE_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const PORT = 3000 || process.env.PORT;
const typeDefs = fs.readFileSync(path.join(__dirname, './schema/userSchema.graphql'), 'utf8');
const resolvers = require('./resolver/userResolver');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const token = req.headers.authorization || '';
		try {
			const user = jwt.verify(token, SECRET_KEY);
			return { user };
		} catch (error) {
			return { user: null };
		}
	},
});

server.listen(PORT).then(({ url }) => {
	mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true }).then((res, err) => {
		if (!err) {
			console.log(url);
			console.log('Database connection established');
		} else {
			console.log('Database error');
		}
	});
});
