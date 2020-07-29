const ACTION_TYPES = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
  CREATE_GAME_ROOM_REQUEST: 'CREATE_GAME_ROOM_REQUEST',
  CREATE_GAME_ROOM_SUCCESS: 'CREATE_GAME_ROOM_SUCCESS',
  CREATE_GAME_ROOM_ERROR: 'CREATE_GAME_ROOM_ERROR',
  GET_GAME_ROOMS_REQUEST: 'GET_GAME_ROOMS_REQUEST',
  GET_GAME_ROOMS_SUCCESS: 'GET_GAME_ROOMS_SUCCESS',
  GET_GAME_ROOMS_ERROR: 'GET_GAME_ROOMS_ERROR',
  JOIN_GAME_ROOM_REQUEST: 'JOIN_GAME_ROOM_REQUEST',
  JOIN_GAME_ROOM_SUCCESS: 'JOIN_GAME_ROOM_SUCCESS',
  JOIN_GAME_ROOM_ERROR: 'JOIN_GAME_ROOM_ERROR',
  CLEAR_AUTH_STORE: 'CLEAR_AUTH_STORE',
  CLEAR_GAME_STORE: 'CLEAR_GAME_STORE',
  CHECK_IS_USER_IN_SOME_ROOM_REQUEST: 'CHECK_IS_USER_IN_SOME_ROOM_REQUEST',
  CHECK_IS_USER_IN_SOME_ROOM_SUCCESS: 'CHECK_IS_USER_IN_SOME_ROOM_SUCCESS',
  CHECK_IS_USER_IN_SOME_ROOM_ERROR: 'CHECK_IS_USER_IN_SOME_ROOM_ERROR',
  LEAVE_GAME_ROOM_REQUEST: 'LEAVE_GAME_ROOM_REQUEST',
  LEAVE_GAME_ROOM_SUCCESS: 'LEAVE_GAME_ROOM_SUCCESS',
  LEAVE_GAME_ROOM_ERROR: 'LEAVE_GAME_ROOM_ERROR'
};

export default ACTION_TYPES;