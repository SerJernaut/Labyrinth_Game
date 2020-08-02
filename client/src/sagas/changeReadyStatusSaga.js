import {put} from "redux-saga/effects";
import {getReadyPlayer, getUnreadyPlayer} from "../api/http/axios/gameController";
import {createChangeReadyStatusErrorAction} from "../actions/actionCreators";

export function * changeReadyStatusSaga ({neededIsReadyStatus, gameRoomId}) {
    try {
        neededIsReadyStatus ? yield getReadyPlayer({gameRoomId})
                : yield getUnreadyPlayer({gameRoomId});
        }
    catch (e) {
        yield put(createChangeReadyStatusErrorAction(e.response));
    }
}