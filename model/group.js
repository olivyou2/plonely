const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  members: [
    {
      user: {
        type: Types.ObjectId,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },
  ],
});

const Group = model('group', schema);

module.exports = Group;
