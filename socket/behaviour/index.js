/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const io = require('socket.io');

const loadBehaviours = () => {
  const sessionBehaviourPath = `${__dirname}/session/`;

  const listeners = [];
  const sessionPaths = fs.readdirSync(sessionBehaviourPath);

  for (const sessionPath of sessionPaths) {
    const behaviour = require(sessionBehaviourPath + sessionPath);
    behaviour.listener((priority, inListener) => {
      listeners.push({
        priority,
        inListener,
      });
    });
  }

  listeners.sort((a, b) => a.priority - b.priority);

  /**
   *
   * @param {io.Server} ioServer
   * @param {io.Socket} ioSocket
   */
  const callback = (ioServer, ioSocket) => {
    const innerListeners = [];

    for (const listener of listeners) {
      listener.inListener(ioServer, ioSocket);
    }
  };

  return callback;
};

module.exports = loadBehaviours;
