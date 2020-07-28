import {put} from "redux-saga/effects";
import {
    createCheckIsUserInSomeRoomSuccessAction,
    createCheckIsUserInSomeRoomErrorAction
} from "../actions/actionCreators";
import {checkIsUserInTheRoom} from "../api/http/axios/gameController";

export function * checkIsUserInSomeRoomSaga () {
    try {
        const {data} = yield checkIsUserInTheRoom();
        if (typeof data === 'object') {
            yield put(createCheckIsUserInSomeRoomSuccessAction(data));
        }
    } catch (e) {
        yield put(createCheckIsUserInSomeRoomErrorAction(e.response));
    }
}