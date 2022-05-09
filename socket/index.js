const { Server } = require('socket.io');
const { SOCKETPORT } = require('../service/env.service');
const { findGroupContains } = require('../service/group.service');
const { checkToken } = require('../service/jwt.service');
const { renderingMap, createStructure, getStructure } = require('../service/map.service');
const { getUser } = require('../service/user.service');
const SessionHandler = require('./session/sessionHandler');

const server = new Server();

const sessionHandler = new SessionHandler();

server.on('connection', (socket) => {
  let session;

  socket.on('group', async (accessToken) => {
    const payload = checkToken(accessToken);
    const { userId } = payload;

    const user = await getUser(userId);
    const groups = await findGroupContains(user.id);

    socket.emit('group', groups);
  });

  socket.on('connect', async (accessToken) => {
    const payload = checkToken(accessToken);
    const { userId } = payload;

    const user = await getUser(userId);

    session = sessionHandler.createSession();

    session.id = socket.id;
    session.x = user.x;
    session.y = user.y;

    socket.join('game');
    socket.to('game').emit('connect', session);
  });

  socket.on('disconnect', () => {
    sessionHandler.removeSession(session);
    socket.to('game').emit('disconnect', session);
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
});

server.listen(SOCKETPORT);

console.log(`Socket server listen on ${SOCKETPORT}`);
