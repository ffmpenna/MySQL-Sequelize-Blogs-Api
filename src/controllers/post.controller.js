const postService = require('../services/post.service');
const errorMap = require('../utils/errorMap');

const createNewPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = res.locals.user;
  const { type, message } = await postService.create({
    title,
    content,
    categoryIds,
    userId: id,
  });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listPosts = async (_req, res) => {
  const { type, message } = await postService.getAll();
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const findPost = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = res.locals.user;

  const { type, message } = await postService.update({
    title,
    content,
    id,
    userId,
  });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = res.locals.user;

  const { type, message } = await postService.remove({ id, userId });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json(message);
};

module.exports = {
  createNewPost,
  findPost,
  listPosts,
  updatePost,
  deletePost,
};
