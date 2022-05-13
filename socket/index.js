const { Server } = require('socket.io');
const { SOCKETPORT } = require('../service/env.service');
const loadBehaviour = require('./behaviour/index');

const server = new Server({
  cors: {
    origin: '*',
  },
});

const events = loadBehaviour(server);

server.on('connection', (socket) => {
  socket.join('lobby');

  events(server, socket);
});

server.listen(SOCKETPORT);
console.log(`Socket server listen on ${SOCKETPORT}`);

module.exports = server;
