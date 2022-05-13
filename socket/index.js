const { Server } = require('socket.io');
const { SOCKETPORT } = require('../service/env.service');
<<<<<<< HEAD
=======
const { findGroupContains } = require('../service/group.service');
const { checkToken } = require('../service/jwt.service');
const { renderingMap, createStructure, getStructure } = require('../service/map.service');
const { getUser } = require('../service/user.service');
const SessionHandler = require('./layers/session/sessionHandler');
>>>>>>> e604f348aec841e48904386637fe4b3e11111231
const loadBehaviour = require('./behaviour/index');

const server = new Server({
  cors: {
    origin: '*',
  },
});

const events = loadBehaviour(server);

<<<<<<< HEAD
server.on('connection', (socket) => {
  socket.join('lobby');

  events(server, socket);
=======
loadBehaviour(server);

server.on('connection', (socket) => {
  socket.join('lobby');

  let session;

  socket.on('group', async (accessToken) => {
    const payload = checkToken(accessToken);
    const { userId } = payload;

    const user = await getUser(userId);
    const groups = await findGroupContains(user.id);

    socket.emit('group', groups);
  });

  socket.on('entrance', async (accessToken) => {
    const payload = checkToken(accessToken);
    const { userId } = payload;

    const user = await getUser(userId);

    session = sessionHandler.createSession();
    session.setUserId(user.user);
    session.id = socket.id;
    session.x = user.x;
    session.y = user.y;

    socket.emit('entranceSelf', sessionHandler.sessions, session, socket.id);

    socket.join('game');
    socket.to('game').emit('entrance', session);
  });

  socket.on('disconnect', () => {
    if (session) {
      sessionHandler.removeSession(session);
    }
    socket.to('game').emit('exit', session);
  });

  socket.on('move', (x, y, time) => {
    session.x = x;
    session.y = y;
    session.time = time;

    socket.to('game').emit('move', session);
  });

  socket.on('render', async (x, y, width, height) => {
    if (width > 100 || height > 100) {
      socket.emit('error', 'width and height both cannot over than 100');
    } else if (width && height) {
      const structures = await renderingMap(x, y, width, height);
      socket.emit('renderMany', structures);
    } else {
      const structure = await getStructure(x, y);
      socket.emit('renderOne', structure);
    }
  });

  socket.on('build', async (x, y, type, group) => {
    const structure = await createStructure(x, y, type, group);
    socket.emit('build', structure);
  });
>>>>>>> e604f348aec841e48904386637fe4b3e11111231
});

server.listen(SOCKETPORT);
console.log(`Socket server listen on ${SOCKETPORT}`);

module.exports = server;
