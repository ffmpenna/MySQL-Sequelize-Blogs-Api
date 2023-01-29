const { Category } = require('../models');
const { validateNewCategory } = require('./validations/validateCategoryInputs');
const { validateId } = require('./validations/validateIdInput');

const create = async ({ name }) => {
  const error = validateNewCategory({ name });
  if (error.type) return error;

  if (await Category.findOne({ where: { name } })) {
    return {
      type: 'CATEGORY_ALREADY_EXISTS',
      message: 'Category already registered',
    };
  }

  const category = await Category.create({
    name,
  });

  return { type: null, message: category.dataValues };
};

const getAll = async () => {
  const categoryList = await Category.findAll();

  return { type: null, message: categoryList };
};

const getById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const category = await Category.findOne({ where: { id } });

  if (!category) {
    return {
      type: 'CATEGORY_NOT_FOUND',
      message: 'one or more "categoryIds" not found',
    };
  }

  return { type: null, message: category };
};

module.exports = { create, getAll, getById };
