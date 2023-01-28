const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const authenticate = async ({ email, password }) => {
  if (!email || !password) {
    return {
      type: 'FIELDS_MISSING',
      message: 'Some required fields are missing',
    };
  }

  const user = await User.findOne({
    attributes: ['id', 'display_name', 'email'],
    where: { email, password },
  });

  if (!user) {
    return { type: 'INVALID_FIELDS', message: 'Invalid fields' };
  }

  const token = generateToken(user.dataValues);

  return { type: null, message: { token } };
};

module.exports = { authenticate };
