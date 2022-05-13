/* eslint-disable no-unused-vars */
const socketio = require('socket.io');
const SessionHandler = require('../../layers/session/sessionHandler');

const sessionHandler = new SessionHandler();

/**
 *
 * @param {socketio.Server} io
 */
const listener = (io) => {
  io.on('entrance');
};

module.exports = {
  listener,
};
