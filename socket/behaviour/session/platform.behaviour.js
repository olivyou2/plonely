/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const socketio = require('socket.io');
const { Structure, Group } = require('../../../model');
const { findGroupContains } = require('../../../service/group.service');
const { checkToken } = require('../../../service/jwt.service');
const { renderingMap, getStructure, createStructure } = require('../../../service/map.service');
const { getUser } = require('../../../service/user.service');
const SessionHandler = require('../../layers/session/sessionHandler');

const sessionHandler = new SessionHandler();

/**
 *
 * @param {(priority:number, listener:(server:socketio.Server, io:socketio.Socket)=>void)=>void} priority
 */
const listener = (priority) => {
  priority(1, (server, socket) => {
    let session;
    let user;

    socket.on('entrance', async (accessToken) => {
      const payload = checkToken(accessToken);
      const { userId } = payload;

      user = await getUser(userId);

      session = sessionHandler.createSession();

      session.setUserId(user.user);
      session.setSocketId(socket.id);

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

    socket.on('build', async (x, y, type, group) => {
      const structure = await createStructure(x, y, type, group);
      server.to('game').emit('build', structure);
    });

    socket.on('render', async (x, y) => {
      const structures = await renderingMap(x, y, 5000, 5000);
      socket.emit('render', structures);
    });

    socket.on('groups', async () => {
      const groups = await findGroupContains(user.id);
      socket.emit('groups', groups);
    });
  });
};

/**
 *
 * @param {String} socketId
 * @returns Session
 */
const getSession = (socketId) => sessionHandler.getSession(socketId);

module.exports = {
  listener,
  getSession,
};
