/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const io = require('socket.io');

/**
 *
 * @param {io.Server} io
 */
const loadBehaviours = (ioServer) => {
  const playerBehaviourPath = `${__dirname}/player/`;
  const sessionBehaviourPath = `${__dirname}/session/`;

  const playerPaths = fs.readdirSync(playerBehaviourPath);
  for (const playerPath of playerPaths) {
    const behaviour = require(playerBehaviourPath + playerPath);
    behaviour.listener(ioServer);
  }

  const sessionPaths = fs.readdirSync(sessionBehaviourPath);
  for (const sessionPath of sessionPaths) {
    const behaviour = require(sessionBehaviourPath + sessionPath);
    behaviour.listener(ioServer);
  }
};

module.exports = loadBehaviours;
