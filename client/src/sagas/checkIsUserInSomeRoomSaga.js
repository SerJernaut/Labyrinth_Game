import {put, select} from "redux-saga/effects";
import {
    createCheckIsUserInSomeRoomSuccessAction,
    createCheckIsUserInSomeRoomErrorAction, createClearError
} from "../actions/actionCreators";
import {checkIsUserInTheRoom} from "../api/http/axios/gameController";

export function * checkIsUserInSomeRoomSaga () {
    try {
        const {data} = yield checkIsUserInTheRoom();
        if (typeof data === 'object') {
            const error = yield select(state=> state.gameRoomsStore.error);
            if (error && error.status === 404) {
                yield put(createClearError());
            }
            yield put(createCheckIsUserInSomeRoomSuccessAction(data));
        }
    } catch (e) {
        yield put(createCheckIsUserInSomeRoomErrorAction(e.response));
    }
}