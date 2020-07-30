import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from "../actions/actionTypes";
import {authSaga} from "./authSaga";
import {gameRoomCreationSaga} from "./gameRoomCreationSaga";
import {getGameRoomsSaga} from "./getGameRoomsSaga";
import {joinGameRoomSaga} from "./joinGameRoomSaga";
import {checkIsUserInSomeRoomSaga} from "./checkIsUserInSomeRoomSaga";
import {leaveGameRoomSaga} from "./leaveGameRoomSaga";
import {removeGameRoomSaga} from "./removeGameRoomSaga";

export default function * () {
    yield takeLatest(ACTION_TYPES.AUTH_REQUEST, authSaga);
    yield takeLatest(ACTION_TYPES.CREATE_GAME_ROOM_REQUEST, gameRoomCreationSaga);
    yield takeLatest(ACTION_TYPES.GET_GAME_ROOMS_REQUEST, getGameRoomsSaga);
    yield takeLatest(ACTION_TYPES.JOIN_GAME_ROOM_REQUEST, joinGameRoomSaga);
    yield takeLatest(ACTION_TYPES.CHECK_IS_USER_IN_SOME_ROOM_REQUEST, checkIsUserInSomeRoomSaga);
    yield takeLatest(ACTION_TYPES.LEAVE_GAME_ROOM_REQUEST, leaveGameRoomSaga);
    yield takeLatest(ACTION_TYPES.REMOVE_GAME_ROOM_REQUEST, removeGameRoomSaga)
}