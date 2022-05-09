const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
    default: 0,
  },
  y: {
    type: Number,
    required: true,
    default: 0,
  },
});

const User = model('user', schema);

module.exports = User;
