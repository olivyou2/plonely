/* eslint-disable no-unused-vars */
const socketio = require('socket.io');
const { getSession } = require('./platform.behaviour');

/**
 *
 * @param {(priority:number, listener:(io:socketio.Socket)=>void)=>void} priority
 */
const listener = (priority) => {
  priority(2, (server, socket) => {
    // const session = getSession(socket.id);
  });
};

module.exports = {
  listener,
};
