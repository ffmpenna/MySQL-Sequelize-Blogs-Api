const { createCategorySchema } = require('./schemas');

const validateNewCategory = (newCategoryData) => {
  const { error } = createCategorySchema.validate(newCategoryData);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = { validateNewCategory };
