import {put} from "redux-saga/effects";
import {
    createSetBoardCellsErrorAction,
} from "../actions/actionCreators";
import {setBoardCells} from "../api/http/axios/gameController";

export function * setBoardCellsSaga (action) {
    try {
        const {gameRoomId, boardCells, history} = action;
        yield setBoardCells({gameRoomId, boardCells, history});
        history.replace(`/game_room/${gameRoomId}`);
    } catch (e) {
        yield put(createSetBoardCellsErrorAction(e.response));
    }
}