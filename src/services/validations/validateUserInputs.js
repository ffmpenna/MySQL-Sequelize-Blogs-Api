const { createUserSchema } = require('./schemas');

const validateNewUser = (newUserData) => {
  const { error } = createUserSchema.validate(newUserData);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = { validateNewUser };
