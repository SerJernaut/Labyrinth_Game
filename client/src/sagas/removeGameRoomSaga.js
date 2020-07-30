import {put} from "redux-saga/effects";
import {
    createRemoveGameRoomSuccessAction,
    createRemoveGameRoomErrorAction,
} from "../actions/actionCreators";
import {removeGameRoomById} from "../api/http/axios/gameController";

export function * removeGameRoomSaga (action) {
    try {
        const {gameRoomId, history} = action;
        yield removeGameRoomById({gameRoomId});
        yield put(createRemoveGameRoomSuccessAction(gameRoomId));
        history.replace('/')
    } catch (e) {
        yield put(createRemoveGameRoomErrorAction(e.response));
    }
}