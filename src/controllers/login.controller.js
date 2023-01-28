const loginService = require('../services/login.service');
const errorMap = require('../utils/errorMap');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginService.authenticate({
    email,
    password,
  });

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = { login };
