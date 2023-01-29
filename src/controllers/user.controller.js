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

module.exports = { createNewUser };
