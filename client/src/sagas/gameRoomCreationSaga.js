import {put, select} from "redux-saga/effects";
import {
    createGameRoomCreationSuccessAction,
    createGameRoomCreationErrorAction, createClearError,
} from "../actions/actionCreators";
import {createGameRoom} from "../api/http/axios/gameController";

export function * gameRoomCreationSaga (action) {
    try {
        const {data} = yield createGameRoom(action.data);
        if (typeof data === 'object') {
            const error = yield select(state=> state.gameRoomsStore.error);
            if (error && error.status === 404) {
                yield put(createClearError());
            }
            yield put(createGameRoomCreationSuccessAction(data));
            action.history.replace(`/waiting_room/${data._id}`);
        }
    } catch (e) {
        yield put(createGameRoomCreationErrorAction(e.response));
    }
}