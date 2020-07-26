import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from "../actions/actionTypes";
import {authSaga} from "./authSaga";
import {gameRoomCreationSaga} from "./gameRoomCreationSaga";
import {getAllGameRoomsSaga} from "./getAllGameRoomsSaga";

export default function * () {
    yield takeLatest(ACTION_TYPES.AUTH_REQUEST, authSaga);
    yield takeLatest(ACTION_TYPES.CREATE_GAME_ROOM_REQUEST, gameRoomCreationSaga);
    yield takeLatest(ACTION_TYPES.GET_ALL_GAME_ROOMS_REQUEST, getAllGameRoomsSaga)
}