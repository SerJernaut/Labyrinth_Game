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

export const createGameRoomCreationRequestAction = (values, history) => ( {
  type: ACTION_TYPES.CREATE_GAME_ROOM_REQUEST,
  data: values,
  history
} );

export const createGameRoomCreationSuccessAction = gameRoomData => ( {
  type: ACTION_TYPES.CREATE_GAME_ROOM_SUCCESS,
  gameRoomData,
} );

export const createGameRoomCreationErrorAction = error => ( {
  type: ACTION_TYPES.CREATE_GAME_ROOM_ERROR,
  error,
} );

export const createGetRoomsRequestAction = filterObj => ({
  type: ACTION_TYPES.GET_GAME_ROOMS_REQUEST,
  filterObj
})

export const createGetRoomsSuccessAction = (gameRoomsData, hasMore) => ({
  type: ACTION_TYPES.GET_GAME_ROOMS_SUCCESS,
  gameRoomsData,
  hasMore
})

export const createGetRoomsErrorAction = error => ({
  type: ACTION_TYPES.GET_GAME_ROOMS_ERROR,
  error
})

export const createJoinGameRoomRequestAction = (gameRoomId, history) => ({
  type: ACTION_TYPES.JOIN_GAME_ROOM_REQUEST,
  gameRoomId,
  history
});

export const createJoinGameRoomSuccessAction = gameRoomData => ({
  type: ACTION_TYPES.JOIN_GAME_ROOM_SUCCESS,
  gameRoomData
});

export const createJoinGameRoomErrorAction = error => ({
  type: ACTION_TYPES.JOIN_GAME_ROOM_ERROR,
  error
});

export const createClearAuthStore = () => ({
  type: ACTION_TYPES.CLEAR_AUTH_STORE,
});

export const createClearGameStore = () => ({
  type: ACTION_TYPES.CLEAR_GAME_STORE,
});

export const createCheckIsUserInSomeRoomRequestAction = () => ({
  type: ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_REQUEST
});

export const createCheckIsUserInSomeRoomSuccessAction = currentGameRoom => ({
  type: ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_SUCCESS,
  currentGameRoom
});

export const createCheckIsUserInSomeRoomErrorAction = error => ({
  type: ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_ERROR,
  error
});

export const createLeaveGameRoomRequestAction = (gameRoomId, history) => ({
  type: ACTION_TYPES.LEAVE_GAME_ROOM_REQUEST,
  gameRoomId,
  history
})

export const createLeaveGameRoomSuccessAction = (updatedRoomPlayers, gameRoomId) => ({
  type: ACTION_TYPES.LEAVE_GAME_ROOM_SUCCESS,
  updatedRoomPlayers,
  gameRoomId
})

export const createLeaveGameRoomErrorAction = error => ({
  type: ACTION_TYPES.LEAVE_GAME_ROOM_ERROR,
  error
})
