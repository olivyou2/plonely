const { Schema, model } = require('mongoose');

const schema = new Schema({
  items: [
    {
      type: {
        type: Number,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  type: {
    type: String,
    required: true,
  },
});

const Storage = model('storage', schema);

module.exports = Storage;
