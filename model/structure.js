const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  storage: [
    {
      id: {
        type: Types.ObjectId,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
    },
  ],
  group: {
    type: Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Structure = model('structure', schema);

module.exports = Structure;
