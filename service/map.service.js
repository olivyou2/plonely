const { Structure } = require('../model');

const renderingMap = (x, y, width, height) => Structure.find({
  x: {
    $gte: x - width / 2,
    $lte: x + width / 2,
  },
  y: {
    $gte: y - height / 2,
    $lte: y + height / 2,
  },
});

const createStructure = async (x, y, type, group) => {
  const structure = new Structure();
  structure.x = x;
  structure.y = y;
  structure.storgae = [];
  structure.type = type;
  structure.group = group;

  await structure.save();
  return structure;
};

const getStructure = (x, y) => Structure.findOne({ x, y });

module.exports = {
  renderingMap,
  createStructure,
  getStructure,
};
