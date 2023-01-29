const Joi = require('joi');

const idSchema = Joi.number().integer().label('id').required();

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).label('displayName').required(),
  email: Joi.string().email().label('email').required(),
  password: Joi.string().min(6).label('password').required(),
  image: Joi.string().label('image'),
});

const createCategorySchema = Joi.object({
  name: Joi.string().label('name').required(),
});

const createPostSchema = Joi.object({
  title: Joi.string()
    .label('title')
    .required()
    .messages({ 'string.empty': 'Some required fields are missing' }),
  content: Joi.string()
    .label('content')
    .required()
    .messages({ 'string.empty': 'Some required fields are missing' }),
  categoryIds: Joi.array()
    .items(Joi.number().integer().label('categoryId').required())
    .label('categoryIds')
    .required()
    .messages({ 'string.empty': 'Some required fields are missing' }),
});

module.exports = {
  idSchema,
  createUserSchema,
  createCategorySchema,
  createPostSchema,
};
