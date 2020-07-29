import {put} from "redux-saga/effects";
import {
    createLeaveGameRoomSuccessAction,
    createLeaveGameRoomErrorAction,
} from "../actions/actionCreators";
import {leaveGameRoomById} from "../api/http/axios/gameController";

export function * leaveGameRoomSaga (action) {
    try {
        const {gameRoomId, history} = action;
        const {data} = yield leaveGameRoomById({gameRoomId});
        if (Array.isArray(data)) {
            yield put(createLeaveGameRoomSuccessAction(data, gameRoomId));
            history.replace('/')
        }
    } catch (e) {
        yield put(createLeaveGameRoomErrorAction(e.response));
    }
}