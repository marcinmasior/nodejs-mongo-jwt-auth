const Joi = require("@hapi/joi");

const authValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateAuthParams = (params) => {
  return authValidationSchema.validate(params);
};

module.exports = {
  validateAuthParams,
};
