const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');
const {
  validateIfCategoryExists,
} = require('./validations/validateCategoryInputs');
const { validateId } = require('./validations/validateIdInput');
const {
  validateNewPost,
  validateUpdatePost,
  validateUpdatePostOwner,
} = require('./validations/validatePostInputs');

const getAll = async () => {
  const postList = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: postList };
};

const getById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const post = await BlogPost.findOne({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { id },
  });

  if (!post) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };

  return { type: null, message: post };
};

const create = async ({ title, content, categoryIds, userId }) => {
  const error = validateNewPost({ title, content, categoryIds });
  if (error.type) return error;

  const categoriesExists = await validateIfCategoryExists(categoryIds);

  if (!categoriesExists) {
    return {
      type: 'CATEGORY_NOT_FOUND',
      message: 'one or more "categoryIds" not found',
    };
  }

  const post = await BlogPost.create({ title, content, userId });

  categoryIds.forEach(async (categoryId) =>
    PostCategory.create({ postId: post.id, categoryId }));

  const {
    dataValues: { user, categories, ...postData },
  } = await (await getById(post.id)).message;

  return { type: null, message: postData };
};

const update = async ({ title, content, id, userId }) => {
  let error = validateUpdatePost({ title, content });
  if (error.type) return error;

  error = await validateUpdatePostOwner({ id, userId });
  if (error.type) return error;

  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await (await getById(id)).message;

  return { type: null, message: updatedPost.dataValues };
};

const remove = async ({ id, userId }) => {
  const error = await validateUpdatePostOwner({ id, userId });
  if (error.type) return error;

  await BlogPost.destroy({ where: { id } });

  return { type: null, message: '' };
};

const search = async (query) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: posts };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
};
