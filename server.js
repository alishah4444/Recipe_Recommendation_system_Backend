'use strict';
require('dotenv').config();
const { ApolloServer, gql, GraphQLScalarType } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const databaseURL = process.env.DATABASE_KEY;
const mongoose = require('mongoose');

const typeDefs = fs.readFileSync(path.join(__dirname, './schema/userSchema.graphql'), 'utf8');
const resolvers = require('./resolver/userResolver');

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true }).then((res, err) => {
		if (!err) {
			console.log('Database connection established');
		} else {
			console.log('Database error');
		}
	});
});
