const Joi = require('joi');

const createGroupValidator = {
  body: Joi.object({
    userId: Joi.string().required(),
  }),
};

const getContainGroupValidator = {
  body: Joi.object({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createGroupValidator,
  getContainGroupValidator,
};
