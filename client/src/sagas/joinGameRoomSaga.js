import {put, select} from "redux-saga/effects";
import {
    createJoinGameRoomSuccessAction,
    createJoinGameRoomErrorAction, createClearError,
} from "../actions/actionCreators";
import {joinGameRoom} from "../api/http/axios/gameController";
import {toast} from "react-toastify";

export function * joinGameRoomSaga (action) {
    try {
        const {data} = yield joinGameRoom(action.gameRoomId);
        if (typeof data === 'object') {
            const error = yield select(state=> state.gameRoomsStore.error);
            if (error && error.status === 404) {
                yield put(createClearError());
            }
            yield put(createJoinGameRoomSuccessAction(data));
            action.history.replace(`/game_room/${data._id}`);
            toast.success('You joined the room')
        }
    } catch (e) {
        yield put(createJoinGameRoomErrorAction(e.response));
    }
}