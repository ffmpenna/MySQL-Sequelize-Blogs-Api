const { authenticateToken } = require('../utils/JWT');

const authorizationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const { type, message } = await authenticateToken(authorization);

  if (type) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  res.locals.user = message;

  return next();
};

module.exports = {
  authorizationMiddleware,
};
