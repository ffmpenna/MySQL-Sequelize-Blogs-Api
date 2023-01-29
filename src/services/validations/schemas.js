const Joi = require('joi');

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).label('displayName').required(),
  email: Joi.string().email().label('email').required(),
  password: Joi.string().min(6).label('password').required(),
  image: Joi.string().label('image'),
});

const createCategorySchema = Joi.object({
  name: Joi.string().label('name').required(),
});

module.exports = {
  createUserSchema,
  createCategorySchema,
};
