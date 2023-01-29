const { Category } = require('../models');
const { validateNewCategory } = require('./validations/validateCategoryInputs');

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

module.exports = { create, getAll };
