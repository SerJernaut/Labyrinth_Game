import {put} from "redux-saga/effects";
import {
    createLeaveGameRoomSuccessAction,
    createLeaveGameRoomErrorAction,
} from "../actions/actionCreators";
import {leaveGameRoomById} from "../api/http/axios/gameController";
import {toast} from "react-toastify";

export function * leaveGameRoomSaga (action) {
    try {
        const {gameRoomId, history} = action;
        const {data} = yield leaveGameRoomById({gameRoomId});
        if (Array.isArray(data)) {
            yield put(createLeaveGameRoomSuccessAction(data, gameRoomId));
            history.replace('/');
            toast.error('You left the room')
        }
    } catch (e) {
        yield put(createLeaveGameRoomErrorAction(e.response));
    }
}