const NICKNAME_PATTERN = /^[A-Z][a-zA-Z0-9]{1,16}$/;
const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?\-^]{8,60}$/;
const SECRET = 'secret';
const REFRESH_TOKEN_EXPIRES_TIME = '30d';
const ACCESS_TOKEN_EXPIRES_TIME = '20s';
const SALT_ROUNDS = 5;
const GET_GAME_ROOMS_LIMIT = 10;
const SOCKET = {
  CONNECTION: 'connection',
  CREATE_GAME_ROOM: 'createGameRoom',
  JOIN_GAME_ROOM: 'joinGameRoom',
  LEAVE_GAME_ROOM: 'leaveGameRoom',
  SEND_JOINED_GAME_ROOM_PLAYER: 'sendJoinedGameRoomPlayer',
  SUBSCRIBE_GAME_ROOM: 'subscribeGameRoom',
  UNSUBSCRIBE_GAME_ROOM: 'unsubscribeGameRoom',
  REMOVE_GAME_ROOM: 'removeGameRoom'
};
const SERVER_PORT = 3001;
const MONGODB_URL = 'mongodb://localhost:27017/labyrinth_db';

module.exports = {
  NICKNAME_PATTERN,
  PASSWORD_PATTERN,
  SECRET,
  REFRESH_TOKEN_EXPIRES_TIME,
  ACCESS_TOKEN_EXPIRES_TIME,
  SALT_ROUNDS,
  GET_GAME_ROOMS_LIMIT,
  SOCKET,
  SERVER_PORT,
  MONGODB_URL
};

