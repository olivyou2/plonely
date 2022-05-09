const mongoose = require('mongoose');
const { DBHOST } = require('../service/env.service');

mongoose.connect(DBHOST).then(() => {
  console.log('Mongoose Connected');
});

const Group = require('./group');
const Network = require('./network');
const Storage = require('./storage');
const Structure = require('./structure');
const User = require('./user');

module.exports = {
  Group,
  Network,
  Storage,
  Structure,
  User,
};
