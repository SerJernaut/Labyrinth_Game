import {put} from "redux-saga/effects";
import {
    createSetWinnerErrorAction,
} from "../actions/actionCreators";
import {setWinner} from "../api/http/axios/gameController";

export function * setWinnerSaga (action) {
    try {
        const {gameRoomId, winner} = action;
        yield setWinner({gameRoomId, winner});
    } catch (e) {
        yield put(createSetWinnerErrorAction(e.response));
    }
}