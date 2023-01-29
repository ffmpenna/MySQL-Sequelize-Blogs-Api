const userService = require('../services/user.service');
const errorMap = require('../utils/errorMap');

const createNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await userService.create({
    displayName,
    email,
    password,
    image,
  });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listUsers = async (_req, res) => {
  const { type, message } = await userService.getAll();
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const findUser = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getById(id);
  
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = { createNewUser, listUsers, findUser };
