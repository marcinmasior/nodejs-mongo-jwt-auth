const Joi = require("@hapi/joi");

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateUserParams = (params) => {
  return userValidationSchema.validate(params);
};

module.exports = {
  validateUserParams,
};
