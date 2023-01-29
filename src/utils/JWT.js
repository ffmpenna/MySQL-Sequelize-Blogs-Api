const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '&EsE&HRaUHa&2Sr3ti1aM&SNECpNe';

const jwtCfg = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, jwtCfg);

const authenticateToken = async (token) => {
  if (!token) {
    return { type: 'MISSING_AUTH_TOKEN', message: 'Missing auth token' };
  }

  try {
    const decodedData = await jwt.verify(token, JWT_SECRET);
    return { type: '', message: decodedData };
  } catch (err) {
    return { type: 'JWT_MALFORMED', message: err.message };
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};
