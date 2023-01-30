const Joi = require('joi');

const FIELDS_MISSING = 'Some required fields are missing';

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
    .messages({ 'string.empty': FIELDS_MISSING }),
  content: Joi.string()
    .label('content')
    .required()
    .messages({ 'string.empty': FIELDS_MISSING }),
  categoryIds: Joi.array()
    .items(Joi.number().integer().label('categoryId').required())
    .label('categoryIds')
    .required()
    .messages({ 'string.empty': FIELDS_MISSING }),
});

const updatePostSchema = Joi.object({
  title: Joi.string()
    .label('title')
    .required()
    .messages({ 'string.empty': FIELDS_MISSING }),
  content: Joi.string()
    .label('content')
    .required()
    .messages({ 'string.empty': FIELDS_MISSING }),
});

module.exports = {
  idSchema,
  createUserSchema,
  createCategorySchema,
  createPostSchema,
  updatePostSchema,
};
