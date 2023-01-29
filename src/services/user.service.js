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

module.exports = { create };
