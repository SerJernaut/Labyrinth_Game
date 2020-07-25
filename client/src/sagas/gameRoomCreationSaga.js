import {put} from "redux-saga/effects";
import {
    createGameRoomCreationSuccessAction,
    createGameRoomCreationErrorAction,
} from "../actions/actionCreators";
import {createGameRoom} from "../api/http/axios/gameController";

export function * gameRoomCreationSaga (action) {
    try {

        const {data} = yield createGameRoom(action.data);
        if (typeof data === 'object')  yield put(createGameRoomCreationSuccessAction(data));
    } catch (e) {
        yield put(createGameRoomCreationErrorAction(e.response));
    }
}