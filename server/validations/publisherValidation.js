const Joi = require("joi");
const publisherValidation = Joi.object({
  publisherName: Joi.string().required().min(1).max(30),
  fullName: Joi.string().required().min(1).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().min(1).max(20),
  isVerify: Joi.boolean(),
  file: Joi.object(),
});

module.exports = publisherValidation;
