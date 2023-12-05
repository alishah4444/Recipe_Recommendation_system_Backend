const socketio = require('socket.io');

let io;

let newScoket;
let accumulatedData = [];

function initializeSocket(httpServer) {
	io = socketio(httpServer);

	io.on('connection', (socket) => {
		newScoket = socket;
		console.log('Socket.IO connected:', socket.id);

		io.on('SpeakerRecipeAdded', function (socket) {
			console.log(socket.id, 'just added');
		});
	});

	return io;
}

function emitSomeEvent(data) {
	if (io) {
		io.emit('SOME_EVENT', data);
	} else {
	}
}

function emitReciperCreatre(data, socketId) {
	if (io) {
		accumulatedData.push(data);
		newScoket.broadcast.emit('ReciepeTrigger', accumulatedData);
	} else {
	}
}

module.exports = {
	initializeSocket,
	emitSomeEvent,
	emitReciperCreatre,
};
