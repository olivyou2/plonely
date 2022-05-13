const { Group } = require('../model');

const createGroup = async (userId) => {
  const group = new Group();
  group.members = [
    {
      user: userId,
      role: 'master',
    },
  ];
  await group.save();

  return group;
};

const getGroup = (groupId) => Group.findById(groupId);

const findGroupContains = async (userId) => {
  console.log(userId);
  const groups = await Group.find({ 'members.user': userId });

  return groups;
};

module.exports = {
  createGroup,
  getGroup,
  findGroupContains,
};
