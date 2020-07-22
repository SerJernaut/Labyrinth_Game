const LOGIN_PATTERN = /^\w{6,16}$/;
const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?\-^]{8,60}$/;
const SECRET = 'secret';
const REFRESH_TOKEN_EXPIRES_TIME = '30d';
const ACCESS_TOKEN_EXPIRES_TIME = '20s';
const SALT_ROUNDS = 5;

module.exports = {
  LOGIN_PATTERN,
  PASSWORD_PATTERN,
  SECRET,
  REFRESH_TOKEN_EXPIRES_TIME,
  ACCESS_TOKEN_EXPIRES_TIME,
  SALT_ROUNDS
};

