const { Category } = require('../../models');
const { createCategorySchema } = require('./schemas');

const validateNewCategory = (newCategoryData) => {
  const { error } = createCategorySchema.validate(newCategoryData);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateIfCategoryExists = async (ids) => {
  const categories = await Promise.all(
    ids.map(async (id) => Category.findOne({ where: { id } })),
  );

  const categoriesExists = categories.every((category) => category);

  return categoriesExists;
};

module.exports = { validateNewCategory, validateIfCategoryExists };
