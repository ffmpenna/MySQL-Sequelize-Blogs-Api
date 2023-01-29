const errorMap = {
  INVALID_FIELDS: 400,
  INVALID_VALUE: 400,
  FIELDS_MISSING: 400,
  JWT_MALFORMED: 401,
  MISSING_AUTH_TOKEN: 401,
  USER_ALREADY_EXISTS: 409,
  CATEGORY_ALREADY_EXISTS: 409,
  USER_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
