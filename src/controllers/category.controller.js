const categoryService = require('../services/category.service');
const errorMap = require('../utils/errorMap');

const createNewCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoryService.create({
    name,
  });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listCategories = async (_req, res) => {
  const { type, message } = await categoryService.getAll();
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = { createNewCategory, listCategories };
