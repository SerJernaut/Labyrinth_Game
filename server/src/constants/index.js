const NICKNAME_PATTERN = /^[A-Z][a-zA-Z0-9]{1,16}$/;
const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?\-^]{8,60}$/;
const SECRET = 'secret';
const REFRESH_TOKEN_EXPIRES_TIME = '30d';
const ACCESS_TOKEN_EXPIRES_TIME = '20s';
const SALT_ROUNDS = 5;
const GET_GAME_ROOMS_LIMIT = 10;
const SOCKET = {
  CONNECTION: 'connection',
};

module.exports = {
  NICKNAME_PATTERN,
  PASSWORD_PATTERN,
  SECRET,
  REFRESH_TOKEN_EXPIRES_TIME,
  ACCESS_TOKEN_EXPIRES_TIME,
  SALT_ROUNDS,
  GET_GAME_ROOMS_LIMIT,
  SOCKET
};

