const { Server } = require('socket.io');
const { SOCKETPORT } = require('../service/env.service');
const { findGroupContains } = require('../service/group.service');
const { checkToken } = require('../service/jwt.service');
const { renderingMap, createStructure, getStructure } = require('../service/map.service');
const { getUser } = require('../service/user.service');
const SessionHandler = require('./session/sessionHandler');

const server = new Server({
  cors: {
    origin: '*',
  },
});

const sessionHandler = new SessionHandler();

server.on('connection', (socket) => {
  let session;

  socket.on('ping', () => {
    socket.emit('pong');
  });

  socket.on('group', async (accessToken) => {
    const payload = checkToken(accessToken);
    const { userId } = payload;

    const user = await getUser(userId);
    const groups = await findGroupContains(user.id);

    socket.emit('group', groups);
  });

  socket.on('entrance', async (accessToken) => {
    console.log(accessToken);
    const payload = checkToken(accessToken);
    const { userId } = payload;

    const user = await getUser(userId);

    session = sessionHandler.createSession();
    session.id = socket.id;
    session.x = user.x;
    session.y = user.y;

    socket.emit('entranceSelf', sessionHandler.sessions, session);

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

    console.log(`${x} ${y}`);

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
