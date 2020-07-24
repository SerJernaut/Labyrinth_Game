import ACTION_TYPES from './actionTypes.js';

export const createAuthRequestAction = (values, isRegistration) => ( {
  type: ACTION_TYPES.AUTH_REQUEST,
  data: values,
  isRegistration
} );

export const createAuthSuccessAction = user => ( {
  type: ACTION_TYPES.AUTH_SUCCESS,
  user,
} );

export const createAuthErrorAction = error => ( {
  type: ACTION_TYPES.AUTH_ERROR,
  error,
} );

export const createGameRoomCreationRequestAction = values => ( {
  type: ACTION_TYPES.CREATE_GAME_ROOM_REQUEST,
  data: values,
} );

export const createGameRoomCreationSuccessAction = preparingGameData => ( {
  type: ACTION_TYPES.CREATE_GAME_ROOM_SUCCESS,
  preparingGameData,
} );

export const createGameRoomCreationErrorAction = preparingGameData => ( {
  type: ACTION_TYPES.CREATE_GAME_ROOM_ERROR,
  preparingGameData,
} );
