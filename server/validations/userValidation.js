const Joi = require("joi");
const userValidation = Joi.object({
  username: Joi.string().min(1).max(30),
  fullName: Joi.string().min(1).max(30),
  imgUrl: Joi.string().min(1).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(1).max(20),
});

module.exports = userValidation;
