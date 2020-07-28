import {put} from "redux-saga/effects";
import {
    createJoinGameRoomSuccessAction,
    createJoinGameRoomErrorAction,
} from "../actions/actionCreators";
import {joinGameRoom} from "../api/http/axios/gameController";

export function * joinGameRoomSaga (action) {
    try {
        const {data} = yield joinGameRoom(action.gameRoomId);
        if (typeof data === 'object') {
            yield put(createJoinGameRoomSuccessAction(data));
            action.history.replace(`/waiting_room/${data._id}`);
        }
    } catch (e) {
        yield put(createJoinGameRoomErrorAction(e.response));
    }
}