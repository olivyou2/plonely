const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  from: [
    {
      id: {
        type: Types.ObjectId,
        required: true,
      },
      weight: {
        type: Types.ObjectId,
        required: true,
      },
    },
  ],
  to: [
    {
      id: {
        type: Types.ObjectId,
        required: true,
      },
      weight: {
        type: Types.ObjectId,
        required: true,
      },
    },
  ],
});

const Network = model('network', schema);

module.exports = Network;
