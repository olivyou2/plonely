const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const { JWTKEY } = require('./env.service');
const errors = require('../error/errors');

const generateToken = (userId) => {
  const token = jwt.sign({
    userId,
  }, JWTKEY);

  return token;
};

const checkToken = (token) => {
  try {
    return jwt.verify(token);
  } catch {
    throw new createHttpError.BadRequest(errors.JWT_EXPIRE);
  }
};

module.exports = {
  generateToken,
  checkToken,
};
