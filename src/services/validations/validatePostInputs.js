const { createPostSchema } = require('./schemas');

const validateNewPost = (newPostData) => {
  const { error } = createPostSchema.validate(newPostData);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = { validateNewPost };
