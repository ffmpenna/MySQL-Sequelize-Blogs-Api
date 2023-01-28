const errorMap = {
  INVALID_FIELDS: 400,
  FIELDS_MISSING: 400,
  JWT_MALFORMED: 401,
  MISSING_AUTH_TOKEN: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
