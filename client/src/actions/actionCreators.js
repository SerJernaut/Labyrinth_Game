import ACTION_TYPES from "./actionTypes";
const {AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CREATE_GAME_ROOM_REQUEST,
  CREATE_GAME_ROOM_SUCCESS,
  CREATE_GAME_ROOM_ERROR,
  GET_GAME_ROOMS_REQUEST,
  GET_GAME_ROOMS_SUCCESS,
  GET_GAME_ROOMS_ERROR,
  JOIN_GAME_ROOM_REQUEST,
  JOIN_GAME_ROOM_SUCCESS,
  JOIN_GAME_ROOM_ERROR,
  CLEAR_AUTH_STORE,
  CLEAR_GAME_STORE,
  CHECK_IS_USER_IN_SOME_ROOM_REQUEST,
  CHECK_IS_USER_IN_SOME_ROOM_SUCCESS,
  CHECK_IS_USER_IN_SOME_ROOM_ERROR,
  LEAVE_GAME_ROOM_REQUEST,
  LEAVE_GAME_ROOM_SUCCESS,
  LEAVE_GAME_ROOM_ERROR,
  REMOVE_GAME_ROOM_REQUEST,
  REMOVE_GAME_ROOM_SUCCESS,
  REMOVE_GAME_ROOM_ERROR,
  CLEAR_ERROR,
  CHANGE_READY_STATUS_REQUEST,
  CHANGE_READY_STATUS_SUCCESS,
  CHANGE_READY_STATUS_ERROR,
  START_GAME_REQUEST,
  START_GAME_SUCCESS,
  START_GAME_ERROR,
  } = ACTION_TYPES;

export const createAuthRequestAction = (values, isRegistration) => ( {
  type: AUTH_REQUEST,
  data: values,
  isRegistration
} );

export const createAuthSuccessAction = user => ( {
  type: AUTH_SUCCESS,
  user,
} );

export const createAuthErrorAction = error => ( {
  type: AUTH_ERROR,
  error,
} );

export const createGameRoomCreationRequestAction = (values, history) => ( {
  type: CREATE_GAME_ROOM_REQUEST,
  data: values,
  history
} );

export const createGameRoomCreationSuccessAction = (gameRoomData, isSocket) => ( {
  type: CREATE_GAME_ROOM_SUCCESS,
  gameRoomData,
  isSocket
} );

export const createGameRoomCreationErrorAction = error => ( {
  type: CREATE_GAME_ROOM_ERROR,
  error,
} );

export const createGetRoomsRequestAction = filterObj => ({
  type: GET_GAME_ROOMS_REQUEST,
  filterObj
})

export const createGetRoomsSuccessAction = (gameRoomsData, hasMore) => ({
  type: GET_GAME_ROOMS_SUCCESS,
  gameRoomsData,
  hasMore
})

export const createGetRoomsErrorAction = error => ({
  type: GET_GAME_ROOMS_ERROR,
  error
})

export const createJoinGameRoomRequestAction = (gameRoomId, history) => ({
  type: JOIN_GAME_ROOM_REQUEST,
  gameRoomId,
  history
});

export const createJoinGameRoomSuccessAction = (gameRoomData) => ({
  type: JOIN_GAME_ROOM_SUCCESS,
  gameRoomData
});

export const createJoinGameRoomErrorAction = error => ({
  type: JOIN_GAME_ROOM_ERROR,
  error
});

export const createClearAuthStore = () => ({
  type: CLEAR_AUTH_STORE,
});

export const createClearGameStore = () => ({
  type: CLEAR_GAME_STORE,
});

export const createCheckIsUserInSomeRoomRequestAction = () => ({
  type: CHECK_IS_USER_IN_SOME_ROOM_REQUEST
});

export const createCheckIsUserInSomeRoomSuccessAction = gameRoomData => ({
  type: CHECK_IS_USER_IN_SOME_ROOM_SUCCESS,
  gameRoomData
});

export const createCheckIsUserInSomeRoomErrorAction = error => ({
  type: CHECK_IS_USER_IN_SOME_ROOM_ERROR,
  error
});

export const createLeaveGameRoomRequestAction = (gameRoomId, history) => ({
  type: LEAVE_GAME_ROOM_REQUEST,
  gameRoomId,
  history
})

export const createLeaveGameRoomSuccessAction = (updatedRoomPlayers, gameRoomId) => ({
  type: LEAVE_GAME_ROOM_SUCCESS,
  updatedRoomPlayers,
  gameRoomId
})

export const createLeaveGameRoomErrorAction = error => ({
  type: LEAVE_GAME_ROOM_ERROR,
  error
})

export const createRemoveGameRoomRequestAction = (gameRoomId, history) => ({
  type: REMOVE_GAME_ROOM_REQUEST,
  gameRoomId,
  history
})

export const createRemoveGameRoomSuccessAction = (gameRoomId, history) => ({
  type: REMOVE_GAME_ROOM_SUCCESS,
  gameRoomId,
  history
})

export const createRemoveGameRoomErrorAction = error => ({
  type: REMOVE_GAME_ROOM_ERROR,
  error
})

export const createClearError = () => ({
  type: CLEAR_ERROR,
});

export const createChangeReadyStatusRequestAction = (neededIsReadyStatus, gameRoomId) => ({
  type: CHANGE_READY_STATUS_REQUEST,
  neededIsReadyStatus,
  gameRoomId
});

export const createChangeReadyStatusSuccessAction = (changedIsReadyStatus, gameRoomId, playerId) => ({
  type: CHANGE_READY_STATUS_SUCCESS,
  changedIsReadyStatus,
  gameRoomId,
  playerId
})

export const createChangeReadyStatusErrorAction = error => ({
  type: CHANGE_READY_STATUS_ERROR,
  error
})

export const createStartGameRequestAction = (gameRoomId, boardCells) => ({
  type: START_GAME_REQUEST,
  gameRoomId,
  boardCells
})

export const createStartGameSuccessAction = (gameRoomId, boardCells) => ({
  type: START_GAME_SUCCESS,
  gameRoomId,
  boardCells,
})

export const createStartGameErrorAction = error => ({
  type: START_GAME_ERROR,
  error
})