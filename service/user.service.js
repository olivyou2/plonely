const crypto = require('crypto');
const createHttpError = require('http-errors');
const errors = require('../error/errors');
const { User } = require('../model');
const { generateToken } = require('./jwt.service');

/**
 *
 * @param {String} userId
 * @param {String} password
 * @returns {any} User Instance
 */
const createUser = async (userId, password) => {
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  if (await User.exists({ user: userId })) {
    throw new createHttpError.BadRequest(errors.USER_EXISTS);
  }

  const user = new User({
    user: userId,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

/**
 *
 * @param {String} userId
 * @param {String} password
 * @returns {String} AccessToken
 */
const loginUser = async (userId, password) => {
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const user = await User.findOne({ user: userId, password: hashedPassword });

  if (!user) {
    throw new createHttpError.BadRequest(errors.USER_NOT_EXISTS);
  }

  const token = generateToken(user.userId);
  return {
    user,
    token,
  };
};

/**
 *
 * @param {String} userId
 * @returns {any} User Instance
 */
const getUser = (userId) => User.findOne({ user: userId });

module.exports = {
  createUser,
  loginUser,
  getUser,
};
