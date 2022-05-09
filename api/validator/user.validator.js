const Joi = require('joi');

const loginUserValidator = {
  body: Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const createUserValidator = {
  body: Joi.object({
    userId: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  loginUserValidator,
  createUserValidator,
};
