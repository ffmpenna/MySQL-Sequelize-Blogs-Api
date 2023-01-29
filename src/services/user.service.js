const { User } = require('../models');
const { generateToken } = require('../utils/JWT');
const { validateNewUser } = require('./validations/validateUserInputs');

const create = async ({ displayName, email, password, image }) => {
  const error = validateNewUser({ displayName, email, password, image });
  if (error.type) return error;

  if (await User.findOne({ where: { email, password } })) {
    return { type: 'USER_ALREADY_EXISTS', message: 'User already registered' };
  }

  const user = await User.create({
    displayName,
    email,
    password,
    image,
  });

  const { password: newPassword, ...userSafeData } = user.dataValues;

  const token = generateToken(userSafeData);

  return { type: null, message: { token } };
};

const getAll = async () => {
  const userList = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { type: null, message: userList };
};

const getById = async (id) => {
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });
  
  if (!user) return { type: 'USER_NOT_FOUND', message: 'User does not exist' };

  return { type: null, message: user };
};

module.exports = { create, getAll, getById };
