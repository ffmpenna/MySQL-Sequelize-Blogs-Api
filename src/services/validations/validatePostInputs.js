const { BlogPost } = require('../../models');
const { createPostSchema, updatePostSchema } = require('./schemas');

const validateNewPost = (newPostData) => {
  const { error } = createPostSchema.validate(newPostData);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateUpdatePost = async ({ title, content, id, userId }) => {
  const { error } = updatePostSchema.validate({ title, content });
  
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const postExists = await BlogPost.findOne({ where: { id } });

  if (!postExists) {
    return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };
  }

  if (postExists.dataValues.userId !== userId) {
    return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
  }

  return { type: null, message: '' };
};

module.exports = { validateNewPost, validateUpdatePost };
