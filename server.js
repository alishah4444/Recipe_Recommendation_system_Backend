'use strict';
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const databaseURL = process.env.DATABASE_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const http = require('http');
const socketio = require('socket.io');
const PORT = 3000 || process.env.PORT;
const typeDefs = fs.readFileSync(path.join(__dirname, './schema/userSchema.graphql'), 'utf8');
const recipeTypeDefs = fs.readFileSync(path.join(__dirname, './schema/reciepeSchema.graphql'), 'utf8');
const resolvers = require('./resolver/userResolver');
const recipeResolvers = require('./resolver/recipeResolver');
const express = require('express');
const app = express();
const mergedTypeDefs = [typeDefs, recipeTypeDefs];
const mergedResolvers = [resolvers, recipeResolvers];
const { initializeSocket, emitSomeEvent } = require('./middleware/socketIo');

const apolloServer = new ApolloServer({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
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

const httpServer = http.createServer(app);

const io = initializeSocket(httpServer);
apolloServer.start().then(() => {
	apolloServer.applyMiddleware({ app });

	httpServer.listen(PORT, () => {
		console.log(`🚀 Apollo Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
		console.log(`🚀 Socket.IO Server ready at http://localhost:${PORT}`);
	});

	mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true }).then((res, err) => {
		if (!err) {
			console.log('Database connection established');
		} else {
			console.log('Database error');
		}
	});
});

module.exports = { io };
